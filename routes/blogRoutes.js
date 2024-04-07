// Module Imports
const multer = require("multer");
const express = require("express");
const {
  uploadBlog,
  getAllBlogs,
  getByName,
  deleteBlog,
  postComment,
} = require("../controller/blogController");
const { authenticate } = require("../middleware/authMiddleware");

// Router Setup
const router = express.Router();

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// @method  GET
// @desc    Just to check if things work
router.get("/", (req, res) => {
  res.send("Hello there!");
});

// @method  POST
// @desc    Upload blogs to DB
// @info    Out of the 8 images, the first one is the cover image(images[0])
router.post("/upload", authenticate, upload.array("images", 8), uploadBlog);

// @method  GET
// @desc    Get all blogs
router.get("/get/all", authenticate, getAllBlogs);

// @method  GET
// @desc    Get blog by ID
router.get("/get/:shortTitle", authenticate, getByName);

// @method  DELETE
// @desc    Delete blog
router.delete("/delete/:id", authenticate, deleteBlog);

module.exports = router;
