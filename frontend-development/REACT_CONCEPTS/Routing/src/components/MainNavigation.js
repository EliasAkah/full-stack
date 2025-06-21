import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNav() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNav;

/*
    An alternative to Link in react-router-dom is the "NavLink"
    The NavLink contains a className and style attribute which holds a function that contains an object {isActive}
    as a parameter. This enables us to style our link base on if the class is active or not.
    we add "end" as a property in so as instruct the browser to only make the homepage link active
    only if we are at the homepage "/". This applies to subsequent paths.
*/
