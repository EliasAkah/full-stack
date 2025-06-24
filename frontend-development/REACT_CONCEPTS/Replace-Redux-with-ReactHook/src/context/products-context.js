import { createContext, useContext, useState } from "react";

const ProductContext = createContext({ products: [], toggleFav: (id) => {} });

export function useProductContext() {
  const productLists = useContext(ProductContext).products;
  const toggleFav = useContext(ProductContext).toggleFav;

  if (!productLists) {
    throw new Error(
      "All ProductContext components must be wrapped with ProductContext component"
    );
  }

  return { productLists, toggleFav };
}

//using an arrow function which takes props as parameter as component function
export default (props) => {
  const [ProductList, setProductList] = useState();

  function toggleFavorite(productId) {
    setProductList((currentProductList) => {
      const prodIndex = currentProductList.findIndex((p) => p.id === productId);
      const newFavStatus = !currentProductList[prodIndex].isFavorite;
      const updatedProducts = [...currentProductList];
      updatedProducts[prodIndex] = {
        ...currentProductList[prodIndex],
        isFavorite: newFavStatus,
      };
      return updatedProducts;
    });
  }

  const productDetails = {
    products: ProductList,
    toggleFav: toggleFavorite,
  };

  return (
    <ProductContext.Provider value={productDetails}>
      {props.children}
    </ProductContext.Provider>
  );
};
