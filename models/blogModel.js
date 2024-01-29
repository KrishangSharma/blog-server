const mongoose = require("mongoose");

const blogModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [],
      required: true,
    },
    likes: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogModel);
