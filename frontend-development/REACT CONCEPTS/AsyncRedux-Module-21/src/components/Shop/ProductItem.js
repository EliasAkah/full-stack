import { useEffect } from "react";

import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { useDispatch } from "react-redux";
import { addMultipleProducts } from "../../store/productSlice.js";
import { addItemToCart } from "../../store/shoppingSlice.js";

const ProductItem = (props) => {
  const { productState, description } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      addMultipleProducts([
        { title: "Hat", price: 5 },
        { title: "Watch", price: 30, quantity: 2 },
        { title: "Sunglasses", price: 15 },
      ])
    );
  }, [dispatch]);

  const itemsLength = productState.items.length;

  if (
    !productState ||
    !Array.isArray(productState.items) ||
    itemsLength === 0
  ) {
    return <p>No products available</p>;
  }

  return (
    <>
      <ul>
        {productState.items.map((item) => (
          <li key={item.id} className={classes.item}>
            <Card>
              <header>
                <h3>{item.title}</h3>
                <div className={classes.price}>${item.price.toFixed(2)}</div>
              </header>
              <p>{description}</p>
              <div className={classes.actions}>
                <button
                  onClick={() => {
                    dispatch(addItemToCart(item));
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductItem;
