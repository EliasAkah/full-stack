import { useParams, Link } from "react-router-dom";
function ProductDetails() {
  const params = useParams();
  return (
    <>
      <h1>Product details</h1>
      <p>{params.productId}</p>
      <Link to=".." relative="path">
        back
      </Link>
    </>
  );
}

export default ProductDetails;

//we acess the url params using useParams function from react-router-dom
