const fs = require("fs");
const path = require("path");

const filePath = path.join(
  path.dirname(require.main.filename),
  "data",
  "cart.json"
);
module.exports = class Cart {
  static addProduct(id, productPrice) {
    //fetch the previous cart
    fs.readFile(filePath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        try {
          cart = JSON.parse(fileContent);
        } catch (parseError) {
          console.error("Error parsing cart.json, resetting cart:", parseError);
        }
      }

      //Analyze the cart => find existing product
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      //Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1; //created a new property "qt" in the updatedProduct object.
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      //updating the cart.json file
      fs.writeFile(filePath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        cb(null);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  }

  static deleteProduct(id, productPrice) {
    console.log("the moved product price: ", productPrice, id);
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        return;
      }

      let cart = JSON.parse(fileContent);

      const updatedProducts = { ...cart }; //cart is an object that contains products(array) and totalPrice property
      const product = updatedProducts.products.find(
        (product) => product.id === id
      );

      if (!product) {
        return;
      }

      updatedProducts.products = updatedProducts.products.filter(
        (prod) => prod.id !== id
      );

      const productQty = product.qty;
      updatedProducts.totalPrice =
        updatedProducts.totalPrice - productPrice * productQty;

      fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
        console.log(err);
      });
    });
  }
};

//because a Cart is not an object that needs to be recreated we omit the contructor() method
