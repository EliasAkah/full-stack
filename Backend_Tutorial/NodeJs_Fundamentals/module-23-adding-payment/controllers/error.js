exports.get404 = (req, res, next) => {
  console.log("checking isLogging for get404", req.session.isLoggedIn);
  res.status(404).render("error/404.ejs", {
    pageTitle: "Page Not Found",
    path: "/404",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.get500 = (req, res, next) => {
  console.log(
    "checking isLogging for get500 coming from error controller",
    req.session.isLoggedIn
  );
  res.status(500).render("error/500.ejs", {
    pageTitle: "Error!",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  });
};
