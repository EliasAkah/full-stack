const Product = require("../models/product");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const fileHelper = require("../util/file"); //create an object we can use to access all helper functions inside file.js

exports.getAddProducts = (req, res, next) => {
  console.log("checking isLogging for getAddProducts", req.session.isLoggedIn);
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    errorMessage: "",
    hasError: false,
    validationErrors: [],
    product: {
      title: "",
      imageUrl: "",
      price: "",
      description: "",
    },
  });
};

exports.postAddProduct = (req, res, next) => {
  console.log("checking isLogging for postAddProducts", req.session.isLoggedIn);
  const title = req.body.title;
  const image = req.file; //reads the returned content of multer
  const price = req.body.price;
  const description = req.body.description;
  const errors = validationResult(req);

  console.log(image);
  if (!image) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      errorMessage: "Attached file is not an image",
      hasError: true,
      validationErrors: [],
      product: {
        title: title,
        price: price,
        description: description,
      },
    });
  }

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      errorMessage: "Attached file is not an image",
      hasError: true,
      validationErrors: [],
      product: {
        title: title,
        price: price,
        description: description,
      },
    });
  }

  const imageUrl = image.path;

  const product = new Product({
    // _id: new mongoose.Types.ObjectId("687e3c64a647b8fa317e2baf"),
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user,
  });

  product
    .save()
    .then((result) => {
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      // console.log("error from admin postAddProduct:  ", err);
      //creating a new error object
      const newErrorObject = new Error(err);
      newErrorObject.httpStatusCode = 500;
      return next(newErrorObject);
    });
};
exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then((products) => {
      console.log("checking products from admin getProducts", products);
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/products",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      const newErrorObject = new Error(err);
      newErrorObject.httpStatusCode = 500;
      return next(newErrorObject);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  console.log("editMode of getEditProduct: ", editMode);
  console.log("cofirm user id of getEditProduct: ", req.user._id);

  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }

      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
        hasError: false,
        errorMessage: "",
        validationErrors: [],
      });
    })
    .catch((err) => {
      const newErrorObject = new Error(err);
      newErrorObject.httpStatusCode = 500;
      return next(newErrorObject);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const image = req.file;
  const updatedDesc = req.body.description;
  const errors = validationResult(req);

  console.log("postEditProduct image: ", image);
  console.log(
    "cofirm user id of postEditProduct: ",
    req.user._id,
    req.query.edit
  );

  if (!errors.isEmpty()) {
    return Product.findById(prodId)
      .then((product) => {
        if (!product) {
          return res.redirect("/");
        }
        res.render("admin/edit-product", {
          pageTitle: "Edit Product",
          path: "/admin/edit-product",
          editing: true,
          product: {
            title: updatedTitle,
            price: updatedPrice,
            description: updatedDesc,
            _id: prodId,
          },
          errorMessage: errors.array()[0].msg,
          validationErrors: errors.array(),
          hasError: true,
        });
      })
      .catch((err) => {
        const newErrorObject = new Error(err);
        newErrorObject.httpStatusCode = 500;
        return next(newErrorObject);
      });
  }

  Product.findById(prodId)
    .then((product) => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect("/");
      }
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;

      if (image) {
        fileHelper.deleteFile(product.imageUrl);
        product.imageUrl = image.path;
      }

      return product.save().then(() => {
        console.log("UPDATED PRODUCT!");
        res.redirect("/admin/products");
      });
    })
    .catch((err) => {
      const newErrorObject = new Error(err);
      newErrorObject.httpStatusCode = 500;
      return next(newErrorObject);
    });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.productId
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/admin/products");
      }
      fileHelper.deleteFile(product.imageUrl);
      return Product.deleteOne({ _id: prodId, userId: req.user._id });
    })
    .then(() => {
      console.log("DESTROYED PRODUCT");
      res.status(200).json({ message: "Success!" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Deleting the product failed!" });
    });
};
