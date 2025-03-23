import { useActionState } from "react";

export default function Form({ handleFormClose, openStatusModal }) {
  function handleFormAction(prevformState, formData) {
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const { FullName, emailAddress, street, postalCode, city } = data;
    console.log(data);
    let errors = [];

    //if fullName is empty
    if (!FullName.trim()) {
      errors.push("Enter Your Full Name");
    }
    if (!emailAddress.trim()) {
      errors.push("Enter Your Email Address");
    }
    if (!street.trim()) {
      errors.push("Enter Your Street");
    }
    if (!postalCode.trim()) {
      errors.push("Enter Your Postal");
    }
    if (!city.trim()) {
      errors.push("Enter Your City");
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          FullName,
          emailAddress,
          street,
          postalCode,
          city,
        },
      };
    }

    return {
      errors: null,
    };
  }
  const [formState, formAction, isPending] = useActionState(handleFormAction, {
    errors: null,
  });
  return (
    <form action={formAction}>
      <h3>Checkout</h3>
      <p>
        Total Amount: <span>$89.95</span>
      </p>
      <div>
        <label htmlFor="FullName">First Name</label>
        <input
          type="text"
          name="FullName"
          id="FullName"
          defaultValue={formState.enteredValues?.FullName}
        />
      </div>
      <div>
        <label htmlFor="emailAddress">E-mail Address</label>
        <input
          type="email"
          name="emailAddress"
          id="emailAddress"
          defaultValue={formState.enteredValues?.emailAddress}
        />
      </div>
      <div>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          name="street"
          id="street"
          defaultValue={formState.enteredValues?.street}
        />
      </div>
      <div>
        <label htmlFor="postalCode">
          <p>Postal Code</p>
          <input
            type="number"
            name="postalCode"
            id="postalCode"
            defaultValue={formState.enteredValues?.postalCode}
          />
        </label>
        <label htmlFor="city">
          <p>City</p>
          <input
            type="text"
            name="city"
            id="city"
            defaultValue={formState.enteredValues?.city}
          />
        </label>
      </div>
      {formState.errors?.length > 0 && (
        <ul>
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div>
        <button onClick={handleFormClose}>Close</button>
        <button onClick={openStatusModal} type="submit">
          {isPending ? "Submitting..." : "Submit Order"}
        </button>
      </div>
    </form>
  );
}

//FullName.trim() => it is not an empty string
/*!FullName.trim()*/ // => is an empty string.
