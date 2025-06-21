import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <p className="actions">
      <button type="submit" disabled={pending}>
        {pending ? "Submitting" : "Submit"}
      </button>
    </p>
  );
}

//useFormStatus() => a hook that returns an object that contains form information during submission.
//it cannot be called in the component that houses the form Element, or where formaction submission is carried out.
//instead it is called and used in a component that will be a subcomponent(childcomponent) of the component that houses the form element.
// the pending property will remain true when the form is still in submission or the promise status is still pending.
// but returns false when the promise status is successful.
