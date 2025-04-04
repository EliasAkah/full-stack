import { currencyFormatter } from "../util/currencyFormatter";

export default function CreateItem({
  name,
  price,
  quantity,
  increaseItem,
  decreaseItem,
}) {
  return (
    <li className = "cart-item">
      <p>
        {name} - {quantity} X {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={decreaseItem}>-</button>
        <span>{quantity}</span>
        <button onClick={increaseItem}>+</button>
      </p>
    </li>
  );
}
