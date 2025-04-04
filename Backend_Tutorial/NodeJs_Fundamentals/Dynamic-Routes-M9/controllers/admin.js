const Product = require("../models/product");
const currencyFormatter = require("../util/currencyFormatter.js");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, price, description);
  product.save();
  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }

  //getting the productId from the url
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    //verify the existence of product
    if (!product) {
      return res.redirect("/");
    }

    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  //getting the id from the form to be editted
  const prodId = req.body.productId; // we have to create an input that has a name called "productId"
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;

  //creating a new instance(object)
  const updatedProject = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedPrice,
    updatedDesc
  );
  updatedProject.save(); //saves the updated project to the necessary jason file.

  res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
      currencyFormatter: currencyFormatter,
    });
  });
};

exports.getDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.delete(prodId);
  res.redirect("/admin/products");
};
