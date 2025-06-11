import { Outlet, Link } from "react-router-dom";

import MainNav from "../components/MainNavigation";

function RootLayout() {
  return (
    <>
      <MainNav />
      <main>
        <Outlet /> <br />
      </main>
    </>
  );
}

export default RootLayout;

//Note: css module classes are imported as variables and therefore should be wrapped within curly braces.
