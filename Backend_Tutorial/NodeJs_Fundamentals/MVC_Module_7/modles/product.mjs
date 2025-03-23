import { __dirname } from "../util/path.mjs"; //contains the absolute path to root folder directory
import path from "path";
import fs from "fs";

export class Product {
  constructor(t) {
    this.title = t; //assigns the argument passed to the class when a new object was created. the title is a property the created would and the t is the value of the title property
  }

  save() {
    const p = path.join(__dirname, "data", "products.json");
    console.log("this is me, wher are u: ", p);
    fs.readFile(p, (err, fileContenet) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContenet);
      }
      products.push(this); //this means that the object that was create was moved into the products array. "this" key word here means the current object
      fs.writeFile(p, JSON.stringify(products), (err) => {
        caches.log(err);
      });
    });
  }

  static fetchAll(cb) {
    const p = path.join(__dirname, "data", "products.json");
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      }
      cb(JSON.parse(fileContent)); // converts the filecontent to javascript object or array for use inside javascript file
    });
    // return products; //returns the products array contain all stored product objects
  }
}

//static preceeding a method in a class. means that the methoed belongs to the class itself(an not the intance(created Object)), and thus can only be accessed using
// the class.
//to ensure that this refer to the class we should use the arrow function, otherwise this will lose its context.

// const products = []; //private array to store product instances
