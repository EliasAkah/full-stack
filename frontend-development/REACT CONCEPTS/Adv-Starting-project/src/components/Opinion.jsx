import { use, useActionState, useOptimistic } from "react";

import { OpinionsContext } from "../store/opinions-context";
export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const { downvoteOpinion, upvoteOpinion } = use(OpinionsContext);

  async function upVote() {
    setOptimisticState("up");
    await upvoteOpinion(id);
  }

  async function downVote() {
    setOptimisticState("down");
    await downvoteOpinion(id);
  }

  const [upVoteState, upVoteAction, upVOtePending] = useActionState(upVote); //to enable or disable button according to change in the promise status of form submission
  const [downVoteState, downVoteAction, downVOtePending] =
    useActionState(downVote);

  const [optimisticVotes, setOptimisticState] = useOptimistic(
    votes,
    (prevVotes, mode) => (mode === "up" ? prevVotes + 1 : prevVotes - 1)
  );

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <button
          formAction={upVoteAction}
          disabled={upVOtePending || downVOtePending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{optimisticVotes}</span>

        <button
          formAction={downVoteAction}
          disabled={upVOtePending || downVOtePending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}

//Multiple form action can be triggered for form submission by assigning by calling "formAction" attribute within the form
// elements that would cause a form to be submitted. create different formSubmission or handling function and assign them respectively
// to their respective form action attribute.
// when formAction is to triggered from the form element we use attribute "action" in side the form element and assign a funtion
//that handles the subsmission action to the "action" attribute.

// when formAction is to triggered by an of the form element we use attribute "formActio" inside those form elements and assign a funtion
//that handles the subsmission action to the "action" attribute.

//useStateAction can only handle one formAction(function that takes care of the form submission) at a time.
//when we want to handle multiple form action with it we should call it multiple times according to the number of action you want to handle.
//useStateAction returns

//useOptimistic returns an object that contains various properties. it is called in component where a particular value(State) wants
// to be updated optimistically

//setOptimisticState=> this function expect an argument, number of argument passed to it through the form action determines
// the number of argument that will be entered inside the callback parameter of useOptimistic after the prevValue parameter,
// it is used to update the  optimisticVotes state optimally and returns an array as its value.
//optimisticVotes returns to old value if promise fails
