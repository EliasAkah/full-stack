const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostList = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ImageUrl: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    creator: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

//non-named export
module.exports = mongoose.model("Message", PostList);
