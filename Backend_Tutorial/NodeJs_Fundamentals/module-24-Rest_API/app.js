const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const feedRoute = require("./routes/feed");
const authRoute = require("./routes/auth");
const { errorMonitor } = require("events");

const app = express();
dotenv.config();

//creating a storage path for the uploaded file on your local folder
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  console.log(file);
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(express.json()); //ensures json files are automatically parsed
app.use(express.urlencoded({ extended: true })); //ensures that

//creating a static file for every data request that starts from images
app.use("/images", express.static("images"));

//setting permission rules for which browsers is allowed to talk to your backend server
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

app.use("/feeds", feedRoute);
app.use("/auth", authRoute);

//creating the error middleware
app.use((error, req, res, next) => {
  console.log("Error comes from middleware: ", error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then((req) => {
    app.listen(8080, () => {
      console.log("I am running the server at port 8080");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*"); //allow any website/ domain
//   res.setHeader("Access-Control-Allow-Method", "GET, POST, PUT, PATCH, DELETE"); //browser use only this methods when calling my API
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // request are allowed to include these custom headers like Content-Type (for JSON) and Authorization (for tokens)

//   next();
// });
