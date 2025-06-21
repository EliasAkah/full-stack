import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { HomePage } from "./pages/Home.js";
import { ProductPage } from "./pages/products.js";


//Alternative method of creating a route and assigning it to a variable for later use
const creatingRoute = createRoutesFromElements(
  <Route>
    <Route path="/" element={<HomePage />}></Route>
    <Route path="/products" element={<ProductPage />}></Route>
  </Route>
);

const router = createBrowserRouter(creatingRoute);
function App() {
  //routerprovider tell the application which router should be loaded
  return <RouterProvider router={router} />;
}

export default App;
