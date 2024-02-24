// Module Imports
const multer = require("multer");
const express = require("express");
const {
  uploadBlog,
  getAllBlogs,
  getById,
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
router.post("/upload", authenticate, upload.array("images", 8), uploadBlog);

// @method  GET
// @desc    Get all blogs
router.get("/get/all", authenticate, getAllBlogs);

// @method  GET
// @desc    Get blog by ID
router.get("/get/:id", authenticate, getById);

// @method  DELETE
// @desc    Delete blog
router.delete("/delete/:id", authenticate, deleteBlog);

// @method  POST
// @desc    Post a comment
router.post("/:id/comment", authenticate, postComment);

module.exports = router;
