exports.getPosts = (req, res, next) => {
  res.status(200).json({
    id: "8r8e8348348",
    title: "JSONS learn",
    content: "the rest ApI",
  });
};

exports.createPost = (req, res, next) => {
  //we are expected to collect the data that was entered inside the form and use it to creat a new post object
  const title = req.body.title;
  const content = req.body.content;

  res.status(201).json({
    message: "Successfully created a new post",
    post: {
      id: new Date().toISOString(),
      title: title,
      content: content,
    },
  });
};
