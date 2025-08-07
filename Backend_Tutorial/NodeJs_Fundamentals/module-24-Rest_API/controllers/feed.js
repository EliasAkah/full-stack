const { validationResult } = require("express-validator");
const path = require(path);
const Post = require("../model/posts");

exports.getPosts = (req, res, next) => {
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

  //replacing backslashes with forward slashes on the received image url
  const ImageUrl = req.file.path.replace(/\\/g, "/");

  const title = req.body.title;
  const content = req.body.content;
  const errors = validationResult(req);

  const post = new Post({
    title: title,
    content: content,
    ImageUrl: ImageUrl,
    creator: {
      name: "David",
    },
  });

  //if errors object is not empty it means an error occured
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is invalid");
    error.statusCode = 422;

    throw error;
  }

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
