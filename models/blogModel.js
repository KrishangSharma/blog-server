const mongoose = require("mongoose");

const blogModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  images: {
    type: [],
    required: true,
  },
});

module.exports = mongoose.model("Blog", blogModel);
