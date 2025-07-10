const mongodb = require("mongodb");

const getDb = require("../util/database").getDb;
class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  save() {
    const db = getDb();
    return db.collection("users")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db.collection("users")
      .findOne({ _id: new mongodb.ObjectId(prodId) })
      .then((user) => {
        console.log("This is the user detail: ", user);
        return user;
      })
      .catch((err) => {
        console.log(err.messsage);
      });
  }
}

module.exports = User;
