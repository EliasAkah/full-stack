import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
import { useSelector } from "react-redux";

const Products = (props) => {
  const productState = useSelector((state) => state.product);
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        <ProductItem
          productState={productState}
          description="This is a first product - amazing!"
        />
      </ul>
    </section>
  );
};

export default Products;
