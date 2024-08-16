export default function UserInput({ name, labelTitle, onChangeValue, value }) {
  return (
        <p>
          <label htmlFor={name}>{labelTitle}</label>
          <input type="number" name={name} required="required" value={value} onChange={onChangeValue} />
        </p>
  );
}