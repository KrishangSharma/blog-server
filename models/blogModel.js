const mongoose = require("mongoose");

const blogModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    shortTitle: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    images: {
      type: [],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogModel);
