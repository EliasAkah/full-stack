const { validationResult } = require("express-validator");

const Post = require("../model/posts");

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        id: "8r8e8348348",
        title: "JSONS learn",
        content: "the rest ApI",
        imageUrl: "images/AppBreweryWallpaper.jpg",
        creator: {
          name: "David",
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  //we are expected to collect the data that was entered inside the form and use it to creat a new post object
  const title = req.body.title;
  const content = req.body.content;
  const errors = validationResult(req);
  const post = new Post({
    title: title,
    content: content,
    ImageUrl: "images/AppBreweryWallpaper.jpg",
    creator: {
      name: "David",
    },
  });

  //if errors object is not empty it means an error occured
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed, entered data is invalid",
      errors: errors.array(),
    });
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
      console.log(error);
    });
};
