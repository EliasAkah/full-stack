const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session); //return MongoDBStore constructor
const crsf = require("csurf");
const flash = require("connect-flash");
const multer = require("multer");

dotenv.config();

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");

const csrfProtection = crsf();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const imageFileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true); // says accept the file because of the second argument is true
  } else {
    cb(null, false); //says reject the file because of the second argument is false
  }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage, fileFilter: imageFileFilter }).single("image")
);
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  // throw new Error("Sync Dummy Error");
  if (!req.session.user) {
    return next(); // move to the next middleware without creating req.user;
  }
  User.findById(req.session.user._id)
    .then((user) => {
      // throw new Error("Dummy Error"); // returns an object error that the catch block receives as an argument
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err)); // returns an object error that the catch block receives as an argument
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get500);
app.use(errorController.get404);

//creating an error handling middleware
app.use((error, req, res, next) => {
  // res.status(error.httpStatusCode).render();
  // res.redirect("/500");
  console.error("GLOBAL ERROR HANDLER:", error);
  console.log("isLoggedIn value from error middleware", req.session.isLoggedIn);
  res.status(500).render("error/500.ejs", {
    pageTitle: "Error!",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then((result) => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
