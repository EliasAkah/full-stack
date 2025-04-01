import { useImperativeHandle, useRef, useContext } from "react";

import FormModal from "./FormModal.jsx";
import { FoodDetailContext } from "../store/Modifiy-Data.jsx";

export default function Modal({ ref, onClose }) {
  const modalRef = useRef();
  const formRef = useRef();
  const { itemList, moveListToClient, setItemList } =
    useContext(FoodDetailContext);

  useImperativeHandle(
    ref,
    () => {
      return {
        open() {
          modalRef.current.showModal();
        },
        close() {
          modalRef.current.close();
        },
      };
    },
    []
  );

  function handleOpenForm() {
    onClose();
    setTimeout(() => {
      if (itemList?.length === 0) {
        formRef.current.close();
      } else {
        formRef.current?.open();
      }
    }, 0);
  }

  function handleFormClose() {
    formRef.current.close();
  }

  async function increaseItem(name) {
    const item = itemList.find((item) => item.name === name);

    if (!item) return; // Prevent errors if item is missing

    console.log("first Item", JSON.stringify({ item: item }));

    const response = await fetch("http://localhost:3000/createItems", {
      method: "POST", // Using POST instead of PUT
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: item, action: "add" }),
    });

    if (!response.ok) {
      console.log(response.statusText);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const itemsResponse = await fetch("http://localhost:3000/items");

    if (!itemsResponse.ok) {
      throw new Error(itemsResponse.statusText);
    }

    const items = await itemsResponse.json();
    console.log([...items]);
    setItemList([...items]);
  }

  async function decreaseItem(name) {
    const item = itemList.find((item) => item.name === name);

    if (!item) return; // Prevent errors if item is missing

    console.log("first Item", JSON.stringify({ item: item }));

    const response = await fetch("http://localhost:3000/createItems", {
      method: "POST", // Using POST instead of PUT
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: item, action: "remove" }),
    });
    if (!response.ok) {
      console.log("Error updating items");
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const itemsResponse = await fetch("http://localhost:3000/items");

    if (!itemsResponse.ok) {
      throw new Error(itemsResponse.statusText);
    }

    const items = await itemsResponse.json();
    console.log([...items]);
    setItemList([...items]);
  }

  console.log("checking the items: ", itemList);

  const orderCount = (itemList || []).reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = { count: 0, price: item.price }; // Store price too
    }
    acc[item.name].count += 1;
    return acc;
  }, {});

  console.log("this is the orderCount: ", orderCount);

  const totalCost = itemList.reduce((acc, item) => {
    const total = (Number(acc) + Number(item.price)).toFixed(2);
    return total;
  }, 0);

  return (
    <>
      <FormModal
        ref={formRef}
        onClose={onClose}
        handleFormClose={handleFormClose}
        totalCost={totalCost}
      />

      <dialog className="modal cart" ref={modalRef} onClose={onClose}>
        <h2>Your Cart</h2>
        {itemList?.length > 0 && (
          <ul>
            {Object.entries(orderCount).map(([name, { count, price }]) => (
              <li className="cart-item" key={name}>
                <p>
                  {name}
                  <span>
                    - {count} X ${price}
                  </span>
                </p>
                <div className="cart-item-actions modal-actions">
                  <button
                    onClick={() => {
                      decreaseItem(name);
                    }}
                  >
                    -
                  </button>
                  <p>{count}</p> {/* Displaying count of each order */}
                  <button
                    onClick={() => {
                      increaseItem(name);
                    }}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {totalCost === 0 ? (
          <h3>There is no Item on your chart</h3>
        ) : (
          <p className="cart-total">${totalCost}</p>
        )}
        <div className="modal-actions">
          <button className="text-button" onClick={onClose}>
            Close
          </button>
          <button
            className="button"
            onClick={handleOpenForm}
            disabled={itemList?.length === 0 ? true : false}
          >
            Go to Checkout
          </button>
        </div>
      </dialog>
    </>
  );
}
