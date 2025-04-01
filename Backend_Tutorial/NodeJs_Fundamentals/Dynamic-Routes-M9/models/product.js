const fs = require("fs");
const path = require("path");
const express = require("express");

const productPath = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const cartPath = path.join(
  path.dirname(require.main.filename),
  "data",
  "cart.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(productPath, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

function addProductToCart(product) {
  fs.writeFile(cartPath, JSON.stringify(product), "utf-8");
}

function getProductFromCart(cb) {
  fs.readFile(cartPath, (error, fileContent) => {
    if (error) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
}
module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(productPath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const findId = products.find((p) => p.id === id);
      cb(findId);
    });
  }

  static addCartProduct(product) {
    addProductToCart(product);
  }

  static getCatProduct(id, cb) {
    getProductFromCart((cartProducts) => {
      const findId = cartProducts.find((p) => p.id === id);
      cb(findId);
    });
  }
};
