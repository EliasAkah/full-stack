const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.ImageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  //saving this Object structure to the database
  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      //update the document
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      //insert a new document
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log("these are the products: ", products);
        return products;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  static deleteById(prodId) {
    const db = getDb();
    db.collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then(() => {
        console.log("Deleted");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}
module.exports = Product;

//cursor methods are .next(), hasNext(), forEach(), toArray();
