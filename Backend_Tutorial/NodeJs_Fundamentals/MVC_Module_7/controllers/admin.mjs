import { Product } from "../modles/product.mjs";

//controller that handles the post request for /add-product url
export function getAddProduct(req, res, next) {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
}

//controller that handles the post request for /add-product url
export function postAddProduct(req, res, next) {
  const title = req.body.title;
  const image = req.body.imageURL;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, image, price, description);
  product.save(); //pushes the value of product to products arra title;
  res.redirect("/");
}

export function getAdminProducts(req, res, next) {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
}

const productController = { getAddProduct, postAddProduct, getAdminProducts };
export { productController };
//Controller are those code written to link Model to the views (i.e the code logic to information sent to the UI)
//if we use only export fn fnName => we will import them like this (import * productContoller from path) to create an object that accessess all the functions here.
//OR we us  {getAddProduct, getAddProduct} to destructure the object containing functions and use the functions directly
