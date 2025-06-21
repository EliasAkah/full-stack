export default function Input({ label, id, notValid, error, ...props }) {
  return (
    <div className="control no-margin">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      <div className="control-error">{notValid && <p>{error}</p>}</div>
    </div>
  );
}
