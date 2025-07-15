const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

const express = require("express");

const errorController = require("./controllers/error");

const User = require("./models/user");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT;

console.log("Server running on port", port);

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//executes if no error occurs when we search our url
app.use((req, res, next) => {
  User.findById("6874cd9e45a29425a845e9f6")
    .then((user) => {
      //a new request property
      req.user = user;
      next(); // ensuring we move over to the next middleware after this one.
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "David",
          email: "david@me.com",
          cart: { items: [] },
        });
        user.save();
      }
    });
    app.listen(3000, () => {
      {
        console.log("I am listening from Port 3000");
      }
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

//Note: when then method returns it argument it is automatically resolved into a promise
//and there would be need another then function to handle or use the returned promise as data.
