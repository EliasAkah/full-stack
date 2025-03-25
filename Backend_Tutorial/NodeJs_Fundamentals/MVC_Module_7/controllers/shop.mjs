import { Product } from "../modles/product.mjs";

//these codes handle the interconnection between the views and the model(where data handlind and process takes place).
//the function here fetches the data  from the backend and display to the views and also collect data from the views and forwards them to the backend.
//this is possible a link has bee created for interaction via these functions.

export function getCart(req, res, next) {
  res.render("shop/cart", {
    pageTitle: "Cart",
    path: "/cart",
  });
}
export function getOrders(req, res, next) {
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
  });
}

export function getIndex(req, res, next) {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop Index",
      path: "/",
    });
  });
}

export function getproducts(req, res, next) {
  Product.fetchAll((products) => {
    res.render("shop/product-lists", {
      prods: products,
      pageTitle: "Product List",
      path: "/products",
    });
  });
}

export function getCheckout(req, res, next) {
  Product.fetchAll((products) => {
    res.render("shop/Checkout", {
      prods: products,
      pageTitle: "Products Checkout",
      path: "/index",
    });
  });
}

const shopController = {
  getCart,
  getproducts,
  getIndex,
  getCheckout,
  getOrders,
};

export { shopController };
