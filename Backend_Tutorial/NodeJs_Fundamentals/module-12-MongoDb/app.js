const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//executes if no error occurs when we search our url
app.use((req, res, next) => {
  User.findByPk(1)
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

//creating an associaion
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Product.belongsToMany(Cart, { through: CartItem });
Cart.belongsToMany(Product, { through: CartItem });
User.hasMany(Order);
Order.belongsTo(User); // helps us create an order for a user
Order.belongsToMany(Product, { through: OrderItem });

//creating a table in the database using sequelize. triggers when run npm start
sequelize
  .sync()
  // .sync({ force: true })
  .then((result) => {
    return User.findByPk(1); // checks for if there is a user with the id 1
  })
  .then((user) => {
    if (!user) {
      User.create({ name: "David", email: "david@gmail.com" });
    }

    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then((cart) => {
    app.listen(3000, () => {
      console.log("I am listening to ur request");
    });
  })
  .catch((err) => {
    console.log(err);
  });

//Note: when then method returns it argument it is automatically resolved into a promise
//and there would need another then function to handle or use the returned promise as data.
