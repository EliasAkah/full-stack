const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const { validationResult } = require("express-validator");

const Post = require("../model/posts");

exports.getPosts = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const postsPerPage = 2;
  let totalPosts;
  Post.find()
    .countDocuments()
    .then((count) => {
      totalPosts = count;
      return Post.find()
        .skip((currentPage - 1) * postsPerPage)
        .limit(postsPerPage)
        .then((posts) => {
          console.log(posts);
          res.status(200).json({
            posts: posts,
            message: "Successfully fetched posts",
            totalItems: totalPosts,
          });
        });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
  Post.find()
    .then((posts) => {
      console.log(posts);
      res
        .status(200)
        .json({ posts: posts, message: "Successfully fetched posts" });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.createPost = (req, res, next) => {
  //we are expected to collect the data that was entered inside the form and use it to create a new post object

  const errors = validationResult(req);
  //if errors object is not empty it means an error occured
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is invalid");
    error.statusCode = 422;

    throw error;
  }

  console.log("req.file:", req.file);
  console.log("req.body:", req.body);

  if (!req.file) {
    const error = new Error("No image provided");
    error.statusCode = 422;
    throw error;
  }

  //replacing backslashes with forward slashes on the received imageUrl and pass the returned path to the varibale ImageUrl
  const ImageUrl = req.file.path.replace(/\\/g, "/");
  console.log("ImageUrl path:", ImageUrl);
  const title = req.body.title;
  const content = req.body.content;

  const post = new Post({
    title: title,
    content: content,
    ImageUrl: ImageUrl,
    creator: {
      name: "David",
    },
  });

  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Successfully created a new post",
        post: result,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;

  //fetching a post from the model(collection) in our database
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ post: post });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is invalid");
    error.statusCode = 422;

    throw error;
  }

  const title = req.body.title;
  const content = req.body.content;

  //if we don't upload a file during form edit ImageUrl is given as below
  let ImageUrl = req.body.image;

  //if file is uploaded during form edit ImageUrl is given as below
  if (req.file) {
    ImageUrl = req.file.path.replace(/\\/g, "/");
  }

  if (!ImageUrl) {
    const error = new Error("No image provided");
    error.statusCode = 422;
    throw error;
  }

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post");
        error.statusCode = 404;
        throw error;
      }
      console.log("ImageUrl path: ", ImageUrl);
      console.log("post.ImageUrl Path: ", post.ImageUrl);
      //comparing the new image path entered by the user and the previous image path from the database and
      if (ImageUrl !== post.ImageUrl) {
        clearImage(post.ImageUrl);
      }
      post.title = title;
      post.content = content;
      post.ImageUrl = ImageUrl;

      return post.save(); //save the updated post to our mongoDB database
    })
    .then((result) => {
      res.status(200).json({ message: "Updated post", post: result });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  console.log("postId: ", postId);

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post");
        error.statusCode = 404;
        throw error;
      }
      clearImage(post.ImageUrl);

      console.log(
        "if postId is valid: ",
        mongoose.Types.ObjectId.isValid(postId)
      );

      return Post.findByIdAndRemove(postId);
    })
    .then((result) => {
      res.status(200).json({ message: "Deleted post" });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  console.log("filepath from clearImage: ", filePath);

  //deletes a file from the images folder in your local folder
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete file:", filePath, err);
    } else {
      console.log("Deleted file:", filePath);
    }
  });
};
