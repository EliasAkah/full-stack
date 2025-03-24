import { Product } from "../modles/product.mjs";

//controller that handles the post request for /add-product url
export function getAddProduct(req, res, next) {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
}

//controller that handles the post request for /add-product url
export function postAddProduct(req, res, next) {
  const product = new Product(req.body.title);
  product.save(); //pushes the value of product to products arra title;
  res.redirect("/");
}

export function shopGetProduct(req, res, next) {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
}


export function getAdminProducts(req, res, next){
  Product.fetchAll((products) => {
    res.render('admin/products', {products: products, pageTitle: "Admin Products", path: "/admin/Products"})
  })
}
const productController = { getAddProduct, postAddProduct, shopGetProduct };

export { productController };
//Controller are those code written to link Model to the views (i.e the code logic to information sent to the UI)
//if we use only export fn fnName => we will import them like this (import * productContoller from path) to create an object that accessess all the functions here.
//OR we us  {getAddProduct, getAddProduct} to destructure the object containing functions and use the functions directly
