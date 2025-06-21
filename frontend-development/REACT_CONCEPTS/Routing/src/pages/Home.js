import { Link, useNavigate } from "react-router-dom";
export function HomePage() {
  //navigating programmatically using useNavigate() function. used when a time expires or an error occurs
  const navigate = useNavigate();

  function navigateHandler() {
    navigate("/products");
  }

  return (
    <>
      <h1>This is the Home Page</h1>
      <p>
        Go to <Link to="products">the list of products</Link>
      </p>
      <br />
      <button onClick={navigateHandler}>navigate</button>
    </>
  );
}
