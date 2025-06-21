import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = (props) => {
  const items = [
    { id: "p1", price: 5, quantity: 1, title: " I love Jesus" },
    { id: "p2", price: 10, quantity: 3, title: " I love the Holy Spirit" },
  ];
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {items.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.title}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
