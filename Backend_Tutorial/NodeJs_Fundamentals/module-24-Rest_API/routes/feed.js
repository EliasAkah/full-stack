const express = require("express");

const feedController = require("../controllers/feed.js");

const router = express.Router();

// GET /feed/posts
router.get("/posts", feedController.getPosts);

// POST /feed/posts
router.post("/posts", feedController.createPost);

//default export
module.exports = router;
