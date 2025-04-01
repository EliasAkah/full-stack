import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import bodyParser from "body-parser";

import express, { response } from "express";

const app = express();

const fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(fileName);

app.use(bodyParser.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/meals", async (req, res) => {
  const filePath = path.join(__dirName, "data", "available-meals.json");

  const meals = await fs.readFile(filePath, "utf8");
  res.json(JSON.parse(meals));
});

app.post("/orders", async (req, res) => {
  console.log("Incoming order data:", req.body);

  const orderData = req.body.order;

  //error handling
  if (
    orderData === null ||
    orderData.items === null ||
    orderData.items.length === 0
  ) {
    return res.status(400).json({ message: "Missing data." });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes("@") ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === "" ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === "" ||
    orderData.customer["postal-code"] === null ||
    orderData.customer["postal-code"].trim() === "" ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ""
  ) {
    return res.status(400).json({
      message:
        "Missing data: Email, name, street, postal code or city is missing.",
    });
  }

  //creating a new order. it handles the successful submission of form
  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };

  const filePath = path.join(__dirName, "data", "orders.json");
  const orders = await fs.readFile(filePath, "utf8");

  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile(filePath, JSON.stringify(allOrders));

  // Clear items after order placement
  await fs.writeFile(
    path.join(__dirName, "data", "items.json"),
    JSON.stringify([]),
    "utf-8"
  );

  res.status(201).json({ message: "Order created!" });
});

app.post("/createItems", async (req, res, next) => {
  try {
    const itemData = req.body.item;
    const action = req.body.action;

    console.log("Received request:", { itemData, action });

    const items = await fs.readFile(
      path.join(__dirName, "data", "items.json"),
      "utf8"
    ); //return json
    const itemsArray = JSON.parse(items);

    if (action === "add") {
      itemsArray.push(itemData);
    } else if (action === "remove") {
      const index = itemsArray.findIndex(
        (existingItem) =>
          existingItem.id === itemData.id && existingItem.name === itemData.name
      );

      if (index !== -1) {
        itemsArray.splice(index, 1); // Remove only the first occurrence
      }
    }

    await fs.writeFile(
      path.join(__dirName, "data", "items.json"),
      JSON.stringify(itemsArray, null, 2),
      "utf8"
    );

    res
      .status(201)
      .json({ message: "An item array is created", items: itemsArray });
  } catch (error) {
    console.error("Error writing items.json:", error);
    res.status(500).json({ error: "Failed to add item" });
  }
});

app.get("/items", async (req, res) => {
  const filePath = path.join(__dirName, "data", "items.json");
  const items = await fs.readFile(filePath, "utf8");
  const itemsArray = JSON.parse(items);
  console.log("checking the itemsArray: ", itemsArray);
  res.json(itemsArray);
});

// app.use((req, res) => {
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }

//   res.status(404).json({ message: "Not found" });
// });

app.listen(3000);
