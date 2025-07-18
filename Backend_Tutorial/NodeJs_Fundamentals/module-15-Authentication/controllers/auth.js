const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
// const sendgridTransport = require("nodemailer-sendgrid-transport");
// const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const signupSuccessHtml = fs.readFileSync(
  path.join(__dirname, "../views/email-templates/signup-success.html"),
  "utf-8"
);
const User = require("../models/user");

//configuring sendgrid
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

dotenv.config();

// const transporter = nodemailer.createTransport(
//   sendgridTransport({ auth: { api_key: process.env.SENDGRID_API_KEY } })
// );

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "willy.gutmann@ethereal.email",
    pass: "u37HKEQ2WMH9NMyCUY",
  },
});

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
    errorMessage: message,
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
    errorMessage: message,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      //user can be null or undefined if no user is found and an object/document if found
      if (!user) {
        req.flash("error", "Invalid email or password.");
        return res.redirect("/login");
      }

      bcrypt.compare(password, user.password).then((doMatch) => {
        //if password matches domatch = true if not domatch = false
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save((err) => {
            if (err) console.error(err);
            res.redirect("/");
          });
        }
        return res.redirect("/login");
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/login");
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
        return transporter.sendMail({
          to: req.body.email,
          from: "ShopDetails <no-reply@ShopDetails.com>",
          Subject: "password reset",
          html: `<p>You requested a password reset</p>
          <p>Click this <a href="http://localhost:3000/reset-password/${token}">link</a> to set a new password</p>  `,
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

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  //checking if the user already exists
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash("error", "email exists already");
        return res.redirect("/signup");
      }
      return bcrypt
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
          return transporter.sendMail({
            to: email,
            from: '"ShopDetails" <no-reply@ShopDetails.com>',
            subject: "Signup succeeded",
            text: "Your signup was successful! Thank you for registering.",
            html: signupSuccessHtml,
          });
        })
        .then((transporterInfo) => {
          console.log("response from sending mail", transporterInfo);
          res.redirect("/login");
        })
        .catch((err) => {
          console.log("sending email error message:", err.message);
        });
    })
    .catch((err) => {
      console.log(err.message);
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
