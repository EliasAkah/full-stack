import { useState } from "react";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

import Header from "../Header.jsx";
import { deleteEvent, fetchEvent, queryClient } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import Modal from "../UI/Modal.jsx"; // Importing the Modal component for confirmation dialog

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false); // State to manage the deletion process

  const params = useParams();
  const navigate = useNavigate();

  const id = params.id; // Extracts the event ID from the URL parameters

  const { data, isPending, isError, error } = useQuery({
    //returns an object containing the data, isPending, isError, and error properties
    queryKey: ["event-details", id], // Unique key for the query
    queryFn: ({ signal }) => fetchEvent({ id, signal }), // Placeholder for fetching event details
  });

  const {
    mutate,
    isPending: isPendingDeleting,
    isError: isErrorDeleting,
    error: ErrorDeleting,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      console.log("Mutation succeeded. Navigating...");
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      }); // Invalidate the "events" query to refresh the list of events
      navigate("/events");
    },
    onError: (error) => {
      console.error("Delete failed:", error);
    },
  });

  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleStopDelete() {
    setIsDeleting(false);
  }

  function handleDelete() {
    mutate({ id: id });
  }

  const formattedDate =
    data &&
    new Date(data.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  return (
    <>
      {isDeleting && (
        <Modal>
          <p>
            Do you really want to delete this event? This action cannot be
            undone.
          </p>
          <div className="form-actions">
            {isPendingDeleting && <p>Deleting, please wait...</p>}
            {!isPendingDeleting && (
              <>
                <button className="button-text" onClick={handleStopDelete}>
                  Cancel
                </button>
                <button className="button" onClick={handleDelete}>
                  Delete
                </button>
              </>
            )}
            {isErrorDeleting && (
              <ErrorBlock
                title="Failed to delete event"
                message={ErrorDeleting.info?.message || "Please try again."}
              />
            )}
          </div>
        </Modal>
      )}

      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details" style={{ textAlign: "center" }}>
        {isPending && <h1>Loading Event Details...</h1>}
        {!isPending && (
          <>
            <header>
              <h1>{data?.title}</h1>
              <nav>
                <button onClick={handleStartDelete}>
                  {isPending ? "Removing..." : "DELETE"}
                </button>
                <Link to="edit">Edit</Link>
              </nav>
            </header>

            <div id="event-details-content">
              <img
                src={"http://localhost:3000/" + data?.image}
                alt={data?.title}
              />
              <div id="event-details-info">
                <div>
                  <p id="event-details-location">{data?.location}</p>
                  <time dateTime={`Todo-DateT$Todo-Time`}>
                    {formattedDate} @ {data?.time}
                  </time>
                </div>
                <p id="event-details-description">{data?.description}</p>
              </div>
            </div>
          </>
        )}
      </article>
      {isError && (
        <ErrorBlock
          title="Failed to load event details"
          message={error.info?.message || "Please try again."}
        />
      )}
    </>
  );
}
