import { useEffect, useState } from "react";

import { createContext } from "react";

export const FoodDetailContext = createContext({
  mealList: [],
  listHandlingFn: () => {},
  itemList: [],
});

export function ModifyData({ children }) {
  const [mealList, setMealList] = useState([]);
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    async function handleFetchMeals() {
      const response = await fetch("http://localhost:3000/meals");

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const mealArray = await response.json();
      console.log(mealArray);

      setMealList([...mealArray]);
    }
    handleFetchMeals();
  }, []);

  async function moveListToClient() {
    const itemsResponse = await fetch("http://localhost:3000/items");

    if (!itemsResponse.ok) {
      throw new Error(itemsResponse.statusText);
    }

    const items = await itemsResponse.json();

    console.log("checking out my items: ", items);

    setItemList([...items]);
  }

  async function populateItems(SpecialMeal) {
    const response = await fetch("http://localhost:3000/createItems", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({item: SpecialMeal, action: "add"}),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const responseData = await response.json();
    console.log(responseData.message);

    await new Promise((resolve) => setTimeout(resolve, 500));
    moveListToClient();
  }

  async function populateOrders(items) {
    const order = { items };

    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const responseData = await response.json();
    console.log(responseData.message);
  }

  const backendContextValue = {
    mealList,
    populateItems: populateItems,
    itemList,
    moveListToClient: moveListToClient,
    populateOrders: populateOrders,
    setItemList: setItemList,
  };

  return (
    <FoodDetailContext.Provider value={backendContextValue}>
      {children}
    </FoodDetailContext.Provider>
  );
}
