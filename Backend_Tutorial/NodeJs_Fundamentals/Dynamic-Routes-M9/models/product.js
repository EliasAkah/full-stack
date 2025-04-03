const fs = require("fs");
const path = require("path");
const Cart = require("./cart.js");

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
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (product) => product.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this; // replacing the existing product with values of the new instance(object) created from the class
        fs.writeFile(productPath, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        //if the new object does not have an id property or id is null.  one is created for it when it calls the save() method. json file is updated as well
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(productPath, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static delete(id) {
    getProductsFromFile((products) => {
      const product = products.find((product) => product.id === id); //products is an array of objects. it is collected from the products.json file
      const existingProductIndex = products.findIndex(
        (product) => product.id === id
      );
      const deletedProducts = [...products];
      if (existingProductIndex !== -1) {
        deletedProducts.splice(existingProductIndex, 1);

        fs.writeFile(productPath, JSON.stringify(deletedProducts), (err) => {
          if (!err) {
            Cart.deleteProduct(id, product.price);
          }
        });
      } else {
        console.log("NO product is found");
      }
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
