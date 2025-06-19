import Image from "next/image";

import classes from "./page.module.css";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";

//handling metadata for dynamic page use a specific function called generateMetadata
export async function generateMetadata({ params }) {
  const meal = await getMeal(params.slug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default async function MealDetailPage({ params }) {
  const meal = await getMeal(params.slug);

  //handles accessing the unavailable meal in the meal venue
  if (!meal) {
    notFound(); //calls the nearest not-found.js or error.js file
  }

  const mealInstruction = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: mealInstruction,
          }}
        ></p>
      </main>
    </>
  );
}
