const { Router } = require("express");
const { body } = require("express-validator");

const User = require("../model/user");
const isAuth = require("../middleware/is-auth");

const authController = require("../controllers/auth");
const router = Router();

router.put(
  "/signup",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email already exists");
          }
        });
      }),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  authController.signup
);

router.post("/login", authController.login);

router.get("/status", isAuth, authController.getUserStatus);

router.put("/status", isAuth, authController.updateUserStatus);

//non-named export
module.exports = router;
