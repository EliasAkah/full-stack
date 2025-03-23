// import { useState, useEffect } from "react";
import AVAILABLE_MEALS from "../../backend/data/available-meals.json";

export default function Articles() {
  return (
    <div id="meals">
      {AVAILABLE_MEALS.map((meal) => (
        <article key={meal.id} className="meal-item">
          <img src={`../../backend/public/${meal.image}`} alt={meal.name} />
          <h3>{meal.name}</h3>
          <p className="meal-item-price">${meal.price}</p>
          <p className="meal-item-description">{meal.description}</p>
          <button className="button">Add To Cart</button>
        </article>
      ))}
    </div>
  );
}
