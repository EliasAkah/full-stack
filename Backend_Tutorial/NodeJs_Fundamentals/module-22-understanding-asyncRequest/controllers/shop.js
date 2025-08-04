const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const Product = require("../models/product");
const Order = require("../models/order");
const doc = require("pdfkit");
const { hasSubscribers } = require("diagnostics_channel");

const ITEMS_PER_PAGE = 1;

exports.getIndex = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  Product.find()
    .countDocuments()
    .then((numProducts) => {
      totalItems = numProducts;
      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then((products) => {
      console.log("checking products from shop getIndex", products);
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
      });
    })
    .catch((err) => {
      console.error("error from getIndex: ", err);
      const newErrorObject = new Error(err);
      err.httpStatusCode = 500;
      return next(newErrorObject);
    });
};

exports.getProducts = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  Product.find()
    .countDocuments()
    .then((numProducts) => {
      totalItems = numProducts;
      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then((products) => {
      console.log("checking products from shop getIndex", products);
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "products",
        path: "/products",
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
      });
    })
    .catch((err) => {
      res.send("<h1>No products found</h1>");
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
      });
    })
    .catch((err) => {
      const newErrorObject = new Error(err);
      err.httpStatusCode = 500;
      return next(newErrorObject);
    });
};

exports.getCart = (req, res, next) => {
  console.log("checking isLogging for getCart", req.session.isLoggedIn);
  console.log(req.user);
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
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
  console.log("checking isLogging for getOrders", req.session.isLoggedIn);
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

exports.getOrderInvoice = (req, res, next) => {
  const orderId = req.params.orderId;
  console.log(orderId);
  Order.findById(orderId)
    .then((order) => {
      //check if the order is undefined
      if (!order) {
        return next(new Error("No order found"));
      }

      if (order.user.userId.toString() !== req.user._id.toString()) {
        return next(new Error("Unauthorized"));
      }

      const filename = "java" + ".pdf";
      const invoicePath = path.join(
        __dirname,
        "..",
        "data",
        "invoices",
        filename
      );

      const pdfDoc = new PDFDocument();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'inline; filename="firstPdf.pdf"');

      pdfDoc.pipe(
        fs.createWriteStream(
          path.join(__dirname, "..", "data", "invoices", "firstPdf.pdf")
        )
      ); //write to pdf

      pdfDoc.pipe(res); //send to client

      pdfDoc.fontSize(26).text("Hello world"); //content of the pdf
      pdfDoc.text("--------------------------------------------");
      let totalAmount = 0;
      order.products.forEach((prod) => {
        totalAmount = totalAmount + prod.quantity * prod.product.price;
        pdfDoc
          .fontSize(16)
          .text(
            prod.quantity +
              " x " +
              prod.product.title +
              " - $" +
              prod.product.price * prod.quantity
          );
      });

      pdfDoc.text("--------------------------------------------");
      pdfDoc.fontSize(20).text("Total Amount: $" + totalAmount);
      pdfDoc.end();

      //getting small files/ sendinf files to browsers for download
      // if (!fs.existsSync(invoicePath)) {
      //   console.error("File does NOT exist at:", invoicePath);
      //   return next(new Error("No invoice found"));
      // }

      // fs.readFile(invoicePath, "utf-8", (err, data) => {
      //   if (err) {
      //     return next(err);
      //   }

      //   res.setHeader("Content-Type", "application/pdf");
      //   res.setHeader(
      //     "Content-Disposition",
      //     'attachment; filename="' + filename + '"'
      //   );
      //   res.send(data);
      // });

      //getting large files / sendinf files to browsers for download
      // const file = fs.createReadStream(invoicePath); //opens the pdf file at invoicePath
      // res.setHeader("Content-Type", "application/pdf");
      // res.setHeader(
      //   "Content-Disposition",
      //   'attachment; filename="' + filename + '"'
      // );

      // file.pipe(res); //pipes(streams) the file to the response
    })
    .catch((err) => next(err));
};
