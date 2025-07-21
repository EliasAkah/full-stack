const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const postmark = require("postmark");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const signupSuccessHtml = fs.readFileSync(
  path.join(__dirname, "../views/email-templates/signup-success.html"),
  "utf-8"
);
const User = require("../models/user");
const client = new postmark.ServerClient(
  "3425a584-e9df-4692-82b4-ecfc58fe1243"
);

dotenv.config();

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message) {
    message = message[0];
  } else {
    message = null;
  }

  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
    oldInput: {},
    errorMessage: message,
    validationErrors: [],
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const errors = validationResult(req);
  console.log("validationResult: ", errors);

  if (!errors.isEmpty()) {
    return res.render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      isAuthenticated: false,
      oldInput: { email: email },
      errorMessage: errors.array()[0].msg,
      validationErros: errors.array(),
    });
  } else {
  }

  req.session.isLoggedIn = true;
  req.session.user = req.user;
  return req.session.save((err) => {
    if (err) console.error(err);
    res.redirect("/");
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash("error");
  if (message) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/reset", {
    path: "/reset-password",
    pageTitle: "Reset Password",
    isAuthenticated: false,
    errorMessage: message,
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log("token generation error", err);
    }
    const token = buffer.toString("hex");

    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash("error", "No account with that email found.");
          return res.redirect("/reset-password");
        }

        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        return client.sendEmail({
          To: req.body.email,
          From: "22btrcn341@jainuniversity.ac.in",
          Subject: "password reset",
          TextBody: `You requested a password reset`,
          HtmlBody: `<p>You requested a password reset</p>
          <p>Click this <a href="http://localhost:3000/reset-password/${token}">link</a> to set a new password</p>  `,
          MessageStream: "outbound",
        });
      })
      .then((transporterInfo) => {
        console.log("token email sent: ", transporterInfo);
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

//Rendering the new password form
exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        req.flash("error", "No account with that token found.");
      }

      let message = req.flash("error");
      if (message) {
        message = message[0];
      } else {
        message = null;
      }

      res.render("auth/new-password", {
        path: "/new-password",
        pageTitle: "New Password",
        errorMessage: message,
        passwordToken: token,
        userId: user._id.toString(),
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const token = req.body.passwordToken;
  let resetUser;
  User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId,
  })
    .then((user) => {
      if (!user) {
        req.flash("error", "No account with that token found.");
      }
      resetUser = user;
      //encrypting the new password
      bcrypt
        .hash(newPassword, 12)
        .then((hashedPassword) => {
          if (!resetUser) {
            return;
          }
          resetUser.password = hashedPassword;
          resetUser.resetToken = undefined;
          resetUser.resetTokenExpiration = undefined;
          return resetUser.save();
        })
        .then(() => {
          console.log("Password Updated Successfully");
          res.redirect("/login");
        })
        .catch((err) => {
          console.log("Failed to Hash New Password Error", err);
        });
    })
    .catch((err) => {
      console.log("Failed to FIND USER", err);
      return res.redirect("/reset-password");
    });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  if (message) {
    message = message[0];
  } else {
    message = null;
  }

  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
    oldInput: { email: "", password: "" },
    errorMessage: message,
    validationErros: [],
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log("validation Error", errors.array());
    return res.status(422).render("auth/signup", {
      path: "/signup",
      pageTitle: "Signup",
      isAuthenticated: false,
      oldInput: { email: email, password: password },
      errorMessage: errors.array()[0].msg,
      validationErros: errors.array(),
    });
  }

  //checking if the user already exists
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      //creating a new user
      const user = new User({
        email: email,
        password: hashedPassword,
        cart: { items: [] },
      });

      return user.save();
    })
    .then((result) => {
      return client.sendEmail({
        To: email,
        From: "22btrcn341@jainuniversity.ac.in",
        Subject: "Successful signup",
        TextBody: "Your signup was successful! Thank you for registering.",
        HtmlBody: signupSuccessHtml,
        MessageStream: "outbound",
      });
    })
    .then((transporterInfo) => {
      console.log("response from sending mail", transporterInfo);
      res.redirect("/login");
    })
    .catch((err) => {
      console.log("sending email error message:", err.message);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

//ensuring that the page is redirected only after the session has been saved in the database
// req.session.save((err) => {
//   if (err) console.error(err);
//   res.redirect("/");
// });
