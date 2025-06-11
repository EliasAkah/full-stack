import { redirect, useRouteLoaderData, Await } from "react-router-dom";

import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";
function EventDetail() {
  const { event, events } = useRouteLoaderData("event-detail");
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetail;

export async function loadEvent(id) {
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (response.status === 404) {
    throw new Response(JSON.stringify({ message: "Event not found" }), {
      status: 404,
    });
  }

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Events Details not found" }),
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}
export async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isError: true, message: "Page cannot be found" };
    // throw { message: "Could not fetch events." }; //when thrown triggers the nearest errorElement to execute.
    throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
      status: 500,
    });
  } else {
    const dataRes = await response.json();
    return dataRes.events;
  }
}

export async function loader({ request, params }) {
  const id = params.eventId;
  console.log(id);

  return {
    event: await loadEvent(id),
    events: loadEvents(),
  };
}

export async function action({ params, request }) {
  const eventId = params.eventId;
  console.log("This is the method found: ", request.method);

  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });

  if (request.status === 422) {
    const resData = await response.json();
    return resData.events;
  }

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not delete Event" }, { status: 500 })
    );
  }

  return redirect("/events");
}
