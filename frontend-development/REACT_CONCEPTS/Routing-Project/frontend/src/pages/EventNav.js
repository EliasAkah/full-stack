import { Outlet } from "react-router-dom";

import EventsNavigation from "../components/EventsNavigation.js";
function EventNav() {
  return (
    <>
      <EventsNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default EventNav;
