"use client";

import { useActionState } from "react";

import ImagePicker from "@/components/images/image-picker";
import classes from "./page.module.css";
import { shareMeal } from "@/lib/actions";
import MealFormSubmit from "@/components/meals/meals-form-submit";

//function triggered when a form is submitted. use to handle form submission

export default function ShareMealPage() {
  const [state, formAction] = useActionState(shareMeal, {
    message: null,
  });
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="on"
                required
              />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="on"
                required
              />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              autoComplete="on"
              required
            />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input
              type="text"
              id="summary"
              name="summary"
              autoComplete="on"
              required
            />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
              autoComplete="on"
            ></textarea>
          </p>
          <ImagePicker label="Your Image" name="image" />
          <p className={classes.actions}>
            <MealFormSubmit />
          </p>
        </form>
        {state.message && <p>{state.message}</p>}
      </main>
    </>
  );
}

// NOTE: form datas are stored in the filesystem while the url is forwarded to the backend
// NOTE: images are stored in the filesystem not in the database since database are not cutout for it.
