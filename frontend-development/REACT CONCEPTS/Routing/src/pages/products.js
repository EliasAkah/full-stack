import { Link } from "react-router-dom";

const PRODUCTS = [
  { id: "p1", title: "Product 1" },
  { id: "p2", title: "Product 2" },
  { id: "p3", title: "Product 3" },
];
export function ProductPage() {
  return (
    <>
      <h1>This is the ProductPage</h1>
      <p>
        Go to <Link to="/">Home</Link>
      </p>
      <ul>
        {PRODUCTS.map((prod) => (
          <li key={prod.id}>
            <Link to={prod.id}>{prod.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

/*
    Note:  each time we use the <a></a> tag to move to a new page a new request is sent to the server reponsible for managing request from that application
    thus, defeating the purpose of single page application(SPA).
    Therefore, the most efficient means of accomplishing this is by using the Link tag from react-router-dom
    which takes "to" as attribute in place of "href" used by <a>. it performs the same function as <a>
    without sending a new request to the server.
*/
