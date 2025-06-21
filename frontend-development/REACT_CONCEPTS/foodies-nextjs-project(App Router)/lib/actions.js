"use server"; //ensures that all functions here are server functions(functions executed by/in the server)

import { redirect } from "next/navigation";

import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalid(text) {
  return !text || text === "";
}

export async function shareMeal(prevState, formData) {
  //handles form submission on the server side
  const meal = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    image: formData.get("image"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalid(meal.title) ||
    isInvalid(meal.summary) ||
    isInvalid(meal.instructions) ||
    isInvalid(meal.creator) ||
    isInvalid(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid Input",
    };
  }
  await saveMeal(meal);

  revalidatePath("/meals", "layout");
  redirect("/meals");
}
