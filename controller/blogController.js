const Blog = require("../models/blogModel");
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
    const coverImg = imageUrls[0];
    const blogImgs = imageUrls.slice(1);

    const { title, shortTitle, content, description } = req.body;

    // Validate and construct the blog object
    if (!title || !content || !description) {
      return res
        .status(400)
        .json({ message: "Required fields cannot be empty" });
    }

    const newBlog = new Blog({
      title,
      shortTitle,
      content,
      description,
      coverImage: coverImg,
      images: blogImgs,
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

// Get blog by short title
const getByName = async (req, res) => {
  try {
    const shortTitle = req.params.shortTitle;

    const blog = await Blog.findOne({ shortTitle });

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

module.exports = {
  uploadBlog,
  getAllBlogs,
  getByName,
  deleteBlog,
};
