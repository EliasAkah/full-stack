import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { CartContextProvider } from "./components/store/cartContext.jsx";
import { UserProgressContextProvider } from "./components/store/UserProgressContext.jsx";
import Cart from "./components/Cart.jsx";
import CheckOut from "./components/CheckOut.jsx";

function App() {
  return (
    <UserProgressContextProvider>
      {/*provides the components within it access to its contextvalue */}
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <CheckOut />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
