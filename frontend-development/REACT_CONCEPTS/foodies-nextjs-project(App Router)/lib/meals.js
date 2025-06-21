import fs from "node:fs";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import { redirect } from "next/dist/server/api-utils";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  //   throw new Error("Failed to fetch Meals");
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug); //
}

//handles the storage of filedata to the datatabase
export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true }); // use to create a slug which is a (URL-safe string)
  meal.instructions = xss(meal.instructions); // use to protect html from harmful content thus preventinc cross-site scripting(xss) attacks

  const extension = meal.image.name.split(".").pop(); //extension the fileExetenion of the image
  const fileName = `${meal.slug}.${extension}`; //creates a file name by combinin the slug value and extension value

  const stream = fs.createWriteStream(`public/images/${fileName}`); //
  const bufferedImage = await meal.image.arrayBuffer(); //returns a promise that contains an array that stores the image in chunks

  stream.write(Buffer.from(bufferedImage), () => {
    if (error) {
      throw new Error("Saving image failed");
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(
    `INSERT INTO meals(slug, title, image, summary, instructions, creator, creator_email) VALUES (@slug, @title, @image, @summary, @instructions, @creator, @creator_email)`
  ).run(meal);
}

// NOTE: we use all() and get() method to fetch more than one row and a single row of data from the
//database respectively. while we use run() method to write(update, delete, create) to  the database

// const extension = meal.image.name.split('.').pop(); // splits image.name string into two at the point where '.' is found and
// converts into array of two elements [nameofimage, fileExtension], and then extracts the "fileExtension" and pass it as a value
// to the binding(variable) "extension"

// Buffer.from(bufferedImage) => converts array of chunks of data into chunks of data
