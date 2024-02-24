const mongoose = require("mongoose");

const commentModel = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "User",
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentModel);
