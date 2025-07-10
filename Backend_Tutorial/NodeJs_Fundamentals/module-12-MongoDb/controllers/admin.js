const Product = require("../models/product");

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
  const product = new Product(
    title,
    price,
    description,
    imageUrl,
    null,
    req.user
  );
  product
    .save()
    .then((result) => {
      console.log("created a new product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      console.log(product);

      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => err.message);
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedimageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  // (title, price, description, imageUrl, id)
  const product = new Product(
    updatedTitle,
    updatedPrice,
    updatedDesc,
    updatedimageUrl,
    prodId,
    req.userId
  );
  product
    .save()
    .then((result) => {
      console.log("update Completed");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.deleteById(prodId)
    .then(() => {
      console.log("product successfully deleted");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};
