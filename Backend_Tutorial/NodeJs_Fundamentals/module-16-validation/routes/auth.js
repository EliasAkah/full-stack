const express = require("express");
const { body, check } = require("express-validator");
const authController = require("../controllers/auth");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (!userDoc) {
            return Promise.reject("Email does not exist");
          }
          return true;
        });
      }).normalizeEmail(),

    body("password")
      .custom(async (value, { req }) => {
        const userDoc = await User.findOne({ email: req.body.email });
        if (!userDoc) {
          return Promise.reject("Invalid email or password");
        }

        const doMatch = await bcrypt.compare(value, userDoc.password);
        if (!doMatch) {
          return Promise.reject("Invalid email or password");
        }

        //storing the user in request for controller to use
        req.user = userDoc;
        return true;
      }).trim(),
  ],
  authController.postLogin
);

router.post(
  "/signup",
  [
    body("email")
      .optional()
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        // if (value === "test@test.com") {
        //   throw new Error("This email address is forbidden.");
        // }
        // return true;
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "E-Mail exists already, please pick a different one."
            );
          }
        });
      })
      .normalizeEmail(),
    check(
      "password",
      "Password must be alphanumeric and at least 5 characters long"
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body("confirmPassword")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match");
        }
        return true;
      })
      .trim(),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset-password", authController.getReset);

router.post("/reset-password", authController.postReset);

router.get("/reset-password/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
