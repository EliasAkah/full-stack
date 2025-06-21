import {
  useNavigate,
  Form,
  useNavigation,
  useActionData,
  redirect,
} from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const naviagation = useNavigation();
  const errorData = useActionData();

  const errorvalues =
    errorData !== undefined ? Object.values(errorData.errors) : "";
  console.log("The error is: ", errorvalues);

  const isSubmitting = naviagation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form method={method} className={classes.form}>
      {errorData && errorData.errors && (
        <ul>
          {Object.values(errorData.errors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({ request, params }) {
  const data = await request.formData();

  const enteredData = {
    title: data.get("title"),
    date: data.get("date"),
    image: data.get("image"),
    description: data.get("description"),
  };

  console.log("Entered data:", enteredData);

  let url = "http://localhost:8080/events/";

  if (request.method === "PATCH") {
    let eventId = params.eventId;
    url = "http://localhost:8080/events/" + eventId;
  }

  const response = await fetch(url, {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enteredData),
  });

  // ✅ Handle 422 and pass to component
  if (response.status === 422) {
    return response; // useActionData() will receive this
  }

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Can not save new Event" }, { status: 500 })
    );
  }

  return redirect("/events");
}
