import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { fetchEvent, queryClient, updateEvent } from "../../util/http.js";

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      navigate("../");
    },
    // Optimistically update the cache with the new event data
    onMutate: async (data) => {
      const newEvent = data.event;

      await queryClient.cancelQueries({ queryKey: ["events", params.id] }); // Cancel any ongoing queries for the event being updated
      const previousEvent = queryClient.getQueryData(["events", params.id]); // Get the current event data from the cache

      queryClient.setQueryData(["events", params.id], newEvent); // Update the cache with the new event data

      return { previousEvent }; // Return the previous event data for potential rollback
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(["events", params.id], context.previousEvent); // Rollback to the previous event data in case of an error
    },

    onSettled: () => {
      queryClient.invalidateQueries(["events", params.id]); // Invalidate the event query to ensure fresh data is fetched
    },
  });

  function handleSubmit(formData) {
    mutate({ id: params.id, event: formData });
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  if (isPending) {
    content = <p>Loading event details...</p>;
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            "Failed to load event. Please check your inputs and try again later,"
          }
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}
