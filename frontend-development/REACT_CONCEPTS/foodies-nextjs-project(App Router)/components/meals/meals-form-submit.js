"use client";

import { useFormStatus } from "react-dom";

export default function MealFormSubmit() {
  const { pending } = useFormStatus(); // returns a status object

  return (
    <button disabled={pending}>
      {pending ? "Submittting..." : "Share Meal"}
    </button>
  );
}
