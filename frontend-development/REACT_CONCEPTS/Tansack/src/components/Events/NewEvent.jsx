import { Link, useNavigate } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { useMutation } from "@tanstack/react-query";
import { createNewEvent } from "../../util/http.js";
import { queryClient } from "../../util/http.js";

export default function NewEvent() {
  const navigate = useNavigate(); // use to programmatically navigate to a different route.

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    //executes code within OnSuccess property block when the mutation is successful
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] }); //invalidates all the queries that contains "events" as pass of its query key, causing it to refetch the data.
      navigate("/events"); //navigates to the "/events" route after a successful event creation
    },
  });

  function handleSubmit(formData) {
    mutate({ event: formData }); //passess the object to the createNewEvent function each time the button is pressed, causing the createNewEvent function to be called with the form data.
  }

  return (
    <Modal onClose={() => navigate("../")}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && <p>Submitting...</p>}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          tittle="Failed to create event"
          message={
            error.info?.message ||
            "Failed to create event. Please check your inputs and try again later"
          }
        />
      )}
    </Modal>
  );
}
