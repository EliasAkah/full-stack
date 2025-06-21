export default function Input({ label, id, type, ...props }) {
  return (
    <div className="control">
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} name={id} required {...props} />
    </div>
  );
}
