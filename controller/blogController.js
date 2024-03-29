const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");
const cloudinary = require("../cloudinary-config");

// Upload Blog
const uploadBlog = async (req, res) => {
  try {
    const imageUploadPromises = req.files.map(async (file) => {
      try {
        // Capture the result from cloudinary.uploader.upload_stream
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
              if (error) {
                console.error(error);
                reject("Error uploading image");
              } else {
                // Resolve with the result object
                resolve(result);
              }
            }
          );

          // Pipe the file buffer into the upload stream
          uploadStream.end(file.buffer);
        });

        // Extract and return the URL from the result
        return result.url;
      } catch (error) {
        console.error("Error during Cloudinary upload:", error);
        throw new Error("Error uploading image");
      }
    });

    // Wait for all image uploads to complete
    const imageUrls = await Promise.all(imageUploadPromises);

    const { title, content, description } = req.body;

    // Validate and construct the blog object
    if (!title || !content || !description) {
      return res
        .status(400)
        .json({ message: "Required fields cannot be empty" });
    }

    const newBlog = new Blog({
      title,
      content,
      description,
      images: imageUrls,
    });

    // Save the blog to DB
    await newBlog.save();

    res
      .status(201)
      .json({ message: "Blog post created successfully", blog: newBlog });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error! Try again later" });
  }
};

// Get ALL blogs
const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find();
    res.status(200).json({ blogs: allBlogs });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error!" });
  }
};

// Get blog by ID
const getById = async (req, res) => {
  try {
    const id = req.params.id;

    const blog = await Blog.findById(id).populate("comments");

    res.status(200).json({ blog });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error!" });
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);

    // Delete blog images from cloudinary
    const images = blog.images;

    // Use map to create an array of promises for image deletion
    const deletionPromises = images.map((image) => {
      const imageName = image.split("/")[7];
      const imageID = imageName.split(".")[0];

      // Wrap Cloudinary destroy operation in a promise
      return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(imageID, (error, result) => {
          if (error) {
            console.error(error);
            reject(error);
          } else {
            console.log(result);
            resolve(result);
          }
        });
      });
    });

    // Wait for all image deletions to complete
    await Promise.all(deletionPromises);

    // Delete the blog itself
    const deletedBlog = await blog.deleteOne();

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error!" });
  }
};

// Post a comment
const postComment = async (req, res) => {
  try {
    const blogID = req.params.id;
    const { comment, name } = req.body;

    // Construct a comment
    const newComment = new Comment({
      name,
      comment,
    });

    // Save the new comment to the database
    await newComment.save();

    // Find the blog and update its comments array
    const blog = await Blog.findByIdAndUpdate(
      blogID,
      { $push: { comments: newComment._id } },
      { new: true }
    ).populate("comments");

    res.status(200).json({ message: "Comment posted!", blog });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error! Please try again later" });
  }
};

module.exports = {
  uploadBlog,
  getAllBlogs,
  getById,
  deleteBlog,
  postComment,
};
