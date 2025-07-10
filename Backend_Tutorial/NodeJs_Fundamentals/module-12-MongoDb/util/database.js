const mongodb = require("mongodb");
const MongodbClient = mongodb.MongoClient;
require("dotenv").config();

const url = process.env.MONGO_URL;

console.log("Mongo URL:", url);

let _db;

const mongoConnect = (callback) => {
  MongodbClient.connect(url)
    .then((client) => {
      console.log("Successfully connected");
      _db = client.db("shop"); //create and connect to the database 'shop'
      callback();
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "database not found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

// davidakah1999 08038838681

// const { MongoClient } = require("mongodb");

// const client = new MongoClient(url);

// console.log("This is mongodb connect check", MongoClient.connect());

// module.exports = client;
