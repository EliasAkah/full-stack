import { useContext } from "react";

import { OpinionsContext } from "../store/opinions-context.jsx";

export function NewOpinion() {
  const { addOpinion } = useContext(OpinionsContext);

  function handleSubmission(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    addOpinion(data);

    event.target.reset()
  }
  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form onSubmit={handleSubmission}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5}></textarea>
        </p>

        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
