const { resolveInclude } = require("ejs");
const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  //   const isLogin = req.get("Cookie").split(";")[4].split("=")[1].trim();

  res.render("auth/login.ejs", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("686ebdc526afade0a8730e6f")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      //ensuring that the page is redirected only after the session has been saved in the database
      req.session.save((err) => {
        if (err) console.error(err);
        res.redirect("/");
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/login");
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

//Note: when u have require not defined error Know that u mixed ESM(import) and CJS(require)
