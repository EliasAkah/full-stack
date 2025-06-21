import {
  Link,
  useNavigate,
  useParams,
  useSubmit,
  redirect,
  useNavigation,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { fetchEvent, queryClient, updateEvent } from "../../util/http.js";

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();
  const submit = useSubmit(); // useSubmit is used to submit the form data programmatically by returning a function that can be called to submit the form data.
  const { state } = useNavigation(); // useNavigation is used to get the current navigation state, which can be used to determine if a form submission is in progress.

  const { data, isError, error } = useQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
    staleTime: 10000,
  });

  function handleSubmit(formData) {
    submit(formData, { method: "PUT" });
  }

  function handleClose() {
    navigate("../");
  }

  let content;

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
        {state === "submitting" ? (
          <p>Updating event...</p>
        ) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

export async function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
  });
}

//triggers when a form in this page is submitted
export async function action({ request, params }) {
  const formData = await request.formData(); //extracts form data submitted from the request
  const updatedEventData = Object.fromEntries(formData); //converts the form data into a plain object
  await updateEvent({ id: params.id, event: updatedEventData }); //calls the
  await queryClient.invalidateQueries(["events", params.id]); // Invalidate the event query to ensure fresh data is fetched
  return redirect("../");
}
