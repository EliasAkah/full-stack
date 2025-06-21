import Auth from "./components/Auth.js";
import Counter from "./components/Counter.js";
import Header from "./components/Header.js";
import UserProfile from "./components/UserProfile.js";

import { useSelector } from "react-redux";

function App() {
  const userAuth = useSelector((state) => state.auth.userAuthenticated);
  return (
    <>
      <Header />
      {userAuth ? <UserProfile /> : <Auth />}
      <Counter />
    </>
  );
}

export default App;
