import { useActionState, use } from "react";

import { OpinionsContext } from "../store/opinions-context.jsx";
import SubmitButton from "./SubmitButton.jsx";

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);

  //react that the promise returned by this is resolved before the form is submitted
  async function handleformAction(prevformState, formData) {
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    let errors = [];

    //checking if userName is empty
    if (!data.userName.trim()) {
      errors.push("Please enter your username");
    }

    if (data.title.trim().length < 6) {
      errors.push("Please enter a title with at least 6 characters");
    }

    if (data.body.trim().length < 10 || data.body.trim().length > 300) {
      errors.push("Username must be between 10 to 300 characters");
    }

    //checking if the errors array is not empty
    if (errors.length > 0) {
      return {
        errors: errors,
        enteredValues: {
          title: data.title,
          userName: data.userName,
          body: data.body,
        },
      };
    }

    //submit to backend by call an async function. adding await ensures that the backend is updated before the form data is cleared
    await addOpinion(data);

    return { errors: null };
  }

  const [formState, formAction] = useActionState(handleformAction, {
    errors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>

        {formState.errors?.length > 0 && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <SubmitButton />
      </form>
    </div>
  );
}
