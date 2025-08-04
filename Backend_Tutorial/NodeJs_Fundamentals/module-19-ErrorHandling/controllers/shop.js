const Product = require("../models/product");
const Order = require("../models/order");

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      const newErrorObject = new Error(err);
      err.httpStatusCode = 500;
      return next(newErrorObject);
    });
};

exports.getProducts = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  console.log(req.user);
  Product.find()
    .then((products) => {
      console.log(products);
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      const newErrorObject = new Error(err);
      err.httpStatusCode = 500;
      return next(newErrorObject);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      const newErrorObject = new Error(err);
      err.httpStatusCode = 500;
      return next(newErrorObject);
    });
};

exports.getCart = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  console.log(req.user);
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      const newErrorObject = new Error(err);
      err.httpStatusCode = 500;
      return next(newErrorObject);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("productId:", prodId);
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log("cart result: ", result);
      res.redirect("/cart");
    })
    .catch((err) => {
      const newErrorObject = new Error(err);
      err.httpStatusCode = 500;
      return next(newErrorObject);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      const newErrorObject = new Error(err);
      err.httpStatusCode = 500;
      return next(newErrorObject);
    });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user,
        },
        products: products,
      });
      return order.save();
    })
    .then((result) => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => {
      const newErrorObject = new Error(err);
      err.httpStatusCode = 500;
      return next(newErrorObject);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      const newErrorObject = new Error(err);
      err.httpStatusCode = 500;
      return next(newErrorObject);
    });
};
