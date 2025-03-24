import { __dirname } from "../util/path.mjs"; //contains the absolute path to root folder directory
import path from "path";
import fs from "fs";
const p = path.join(__dirname, "data", "products.json");

//creating a helper function
function getProductFromFile(cb) {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent)); // converts the filecontent to javascript object or array for use inside javascript file
  });
  // return products; //returns the products array contain all stored product objects
}
export class Product {
  constructor(t) {
    this.title = t; //assigns the argument passed to the class when a new object was created. the title is a property the created would and the t is the value of the title property
  }

  save() {
    getProductFromFile((products) => {
      products.push(this);//this means that the object that was create was moved into the products array. "this" key word here means the current object
      fs.writeFile(p, JSON.stringify(products), (err) => {
        caches.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductFromFile(cb);
  }
}

//static preceeding a method in a class. means that the methoed belongs to the class itself(an not the intance(created Object)), and thus can only be accessed using
// the class.
//to ensure that this refer to the class we should use the arrow function, otherwise this will lose its context.

// const products = []; //private array to store product instances

//function getProductFromFile(cb) {} => the argument(value) of the cb parameter here is cb argument passed from fetch all function and other parent function that would call getProductFromFile

/*    fs.readFile(p, (err, fileContenet) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContenet);
      }
      products.push(this); //this means that the object that was create was moved into the products array. "this" key word here means the current object
      fs.writeFile(p, JSON.stringify(products), (err) => {
        caches.log(err);
      });
    }); */