import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomePage } from "./pages/Home.js";
import { ProductPage } from "./pages/products.js";
import RootLayout from "./pages/Root.js";
import ErrorMssg from "./pages/ErrorMssg.js";
import ProductDetails from "./pages/ProductDetails.js";

//creating a router and assigning it to a variable for later use
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorMssg />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <ProductPage /> },
      { path: "products/:productId", element: <ProductDetails /> },
    ],
  },
]);
function App() {
  //routerprovider tell the application which router should be loaded
  return <RouterProvider router={router} />;
}

export default App;
