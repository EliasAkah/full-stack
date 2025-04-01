import { useContext } from "react";

import { FoodDetailContext } from "../store/Modifiy-Data.jsx";

export default function Articles() {
  const { mealList, populateItems } = useContext(FoodDetailContext);

  return (
    <div id="meals">
      {mealList?.map((meal) => (
        <div key={meal.id} className="meal-item">
          <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
          <h3>{meal.name}</h3>
          <p className="meal-item-price">${meal.price}</p>
          <p className="meal-item-description">{meal.description}</p>
          <button
            onClick={() => populateItems(meal)}
            className="meal-item-actions button"
          >
            Add To Cart
          </button>
        </div>
      ))}
    </div>
  );
}
