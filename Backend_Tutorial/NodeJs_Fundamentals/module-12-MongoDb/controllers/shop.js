const Product = require("../models/product.js");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
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
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.getCart = (req, res, next) => {
//   req.user
//     .getCart()
//     .then((cart) => {
//       return cart
//         .getProducts()
//         .then((products) => {
//           res.render("shop/cart", {
//             path: "/cart",
//             pageTitle: "Your Cart",
//             products: products,
//           });
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// exports.postCart = (req, res, next) => {
//   const prodId = req.body.productId;
//   let fetchedCart;

//   req.user
//     .getCart()
//     .then((cart) => {
//       fetchedCart = cart;
//       //returning all the products in the cart as a promise
//       return cart.getProducts({ where: { id: prodId } });
//     })
//     .then((products) => {
//       let product;
//       if (products.length > 0) {
//         product = products[0];
//       }
//       let newQuantity = 1;
//       if (product) {
//         const oldQuantity = newQuantity;
//         newQuantity = oldQuantity + 1;
//         fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
//       }
//       return Product.findByPk(prodId)
//         .then((product) => {
//           fetchedCart.addProduct(product, {
//             through: { quantity: newQuantity },
//           });
//         })
//         .catch((error) => {
//           console.log(error.message);
//         });
//     })
//     .then(() => {
//       res.redirect("/cart");
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// };

// exports.postCartDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   req.user
//     .getCart()
//     .then((cart) => {
//       //getting an array of products which id matches the product id
//       return cart.getProducts({ where: { id: prodId } });
//     })
//     .then((products) => {
//       const product = products[0];
//       //accessing the product inside the cartItem table and deleting it
//       return product.cartItem.destroy();
//     })
//     .then((result) => {
//       res.redirect("/cart");
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// };

// exports.postOrder = (req, res, next) => {
//   let fetchedCart;
//   req.user
//     .getCart()
//     .then((cart) => {
//       fetchedCart = cart;
//       return cart.getProducts();
//     })
//     .then((products) => {
//       req.user
//         .createOrder()
//         .then((order) => {
//           order.addProducts(
//             products.map((product) => {
//               product.orderItem = { quantity: product.cartItem.quantity };
//               return product;
//             })
//           );
//         })
//         .catch((err) => {
//           err.message;
//         });
//     })
//     .then((result) => {
//       fetchedCart.setProducts(null); //removes all the products inside the cart
//     })
//     .then((result) => {
//       res.redirect("/orders");
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// };

// exports.getOrders = (req, res, next) => {
//   req.user.getOrders({ include: ["products"] }).then((orders) => {
//     res.render("shop/orders", {
//       path: "/orders",
//       pageTitle: orders,
//       orders: orders,
//     });
//   });
// };

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", {
//     path: "/checkout",
//     pageTitle: "Checkout",
//   });
// };

//Note: for getCart the  products: products, //in addition to the properites of products object a special cartItem object is provided and it contains
// all the columns of the carItem table as property and the row as value their values
