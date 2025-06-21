import classes from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { authAction } from "../store/authSlice.js";

const Header = () => {
  const dispatch = useDispatch();

  const userAuth = useSelector((state) => state.auth.userAuthenticated);

  function handleLogout() {
    dispatch(authAction.logout());
  }

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {userAuth && (
        <nav>
          <ul>
            <li>
              <a href="/">My Products</a>
            </li>
            <li>
              <a href="/">My Sales</a>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
