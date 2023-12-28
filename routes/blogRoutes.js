// Module Imports
const multer = require("multer");
const express = require("express");
const {
  uploadBlog,
  getAllBlogs,
  getById,
  deleteBlog,
} = require("../controller/blogController");

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
router.post("/upload", upload.array("images", 8), uploadBlog);

// @method  GET
// @desc    Get all blogs
router.get("/get/all", getAllBlogs);

// @method  GET
// @desc    Get blog by ID
router.get("/get/:id", getById);

// @method  DELETE
// @desc    Delete blog
router.delete("/delete/:id", deleteBlog);

module.exports = router;
