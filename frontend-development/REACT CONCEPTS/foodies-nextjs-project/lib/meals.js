import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  //   throw new Error("Failed to fetch Meals");
  return db.prepare("SELECT * FROM meals").all();
}

// NOTE: we use all() and get() method to fetch more than one row and a single row of data from the
//database respectively. while we use run() method to write(update, delete, create) to  the database
