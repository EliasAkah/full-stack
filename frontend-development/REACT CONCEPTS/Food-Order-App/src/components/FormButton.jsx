import { useFormStatus } from "react-dom";

export default function FormButton({ handleFormClose }) {
  const { pending, data, method, action } = useFormStatus();

  console.log(pending);
  console.log(data);
  console.log(method);
  console.log(action);

  return (
    <div className="modal-actions">
      <button className="text-button" onClick={handleFormClose}>
        Close
      </button>
      <button className="button" type="submit">
        {pending ? "Submitting..." : "Submit Order"}
      </button>
    </div>
  );
}
