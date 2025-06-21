import { Link, useSubmit, redirect } from "react-router-dom";

import classes from "./EventItem.module.css";

function EventItem({ event }) {
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure");

    if (proceed) {
      submit({}, { method: "delete" });
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
        <div>
          <Link style={{ marginRight: "10px" }} to=".." relative="path">
            go back by path
          </Link>
          <Link style={{ marginLeft: "10px" }} to=".." relative="route">
            go back by route
          </Link>
        </div>
      </menu>
    </article>
  );
}

export default EventItem;
