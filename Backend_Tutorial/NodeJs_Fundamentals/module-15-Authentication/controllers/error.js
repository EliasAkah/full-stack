exports.get404 = (req, res, next) => {
  res.status(404).render("error/404.ejs", {
    pageTitle: "Page Not Found",
    path: "/404",
    isAuthenticated: req.session.isLoggedIn,
  });
};
