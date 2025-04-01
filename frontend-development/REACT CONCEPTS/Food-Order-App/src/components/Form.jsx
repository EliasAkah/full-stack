import { useActionState, startTransition, useRef } from "react";

export default function Form({ handleFormClose, openStatusModal, totalCost }) {
  const [formState, formAction, isPending] = useActionState(handleFormAction, {
    errors: [],
  });

  const formRef = useRef();

  async function handleFormAction(prevformState, formData) {
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const { name, email, street, "postal-code": postalCode, city } = data;

    let errors = [];
    //if fullName is empty
    if (!name.trim()) {
      errors.push("Enter Your Full Name");
    }
    if (!email.trim()) {
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

    // If validation fails, return errors immediately (Prevents unnecessary API calls)
    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          name,
          email,
          street,
          "postal-code": postalCode,
          city,
        },
      };
    }

    try {
      const itemsResponse = await fetch("http://localhost:3000/items");
      if (!itemsResponse.ok) throw new Error("Failed to fetch items.");

      const itemsArray = await itemsResponse.json();

      // Frontend validation: Block form submission if no items exist
      if (!itemsArray.length) {
        return {
          errors: ["Cannot place an order without items."],
          enteredValues: {},
        };
      }

      data.customer = { name, email, street, "postal-code": postalCode, city };
      data.items = itemsArray;
      console.log(data);

      console.log("Sent Data:", JSON.stringify({ order: data }, null, 2));

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async delay

      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order: data }),
      });

      if (!response.ok) throw new Error("Failed to submit order.");

      const resData = await response.json();
      console.log(resData.message);
      formRef.current.reset();
      openStatusModal();
      handleFormClose();
      return { errors: [], enteredValues: {} };
    } catch (error) {
      console.error("Error:", error.message);
      return {
        errors: ["An unexpected error occurred. Please try again."],
        enteredValues: {},
      };
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(async () => {
          const result = await formAction(new FormData(e.target));
          console.log("Form submission result:", result);
        });
      }}
    >
      <h2>Checkout</h2>
      <p>
        Total Amount: <span>${totalCost}</span>
      </p>
      <div className="control">
        <label htmlFor="name">First Name</label>
        <input
          type="text"
          name="name"
          id="name"
          defaultValue={formState.enteredValues?.name}
        />
      </div>
      <div className="control">
        <label htmlFor="email">E-mail Address</label>
        <input
          type="email"
          name="email"
          id="email"
          defaultValue={formState.enteredValues?.email}
        />
      </div>
      <div className="control">
        <label htmlFor="street">Street</label>
        <input
          type="text"
          name="street"
          id="street"
          defaultValue={formState.enteredValues?.street}
        />
      </div>
      <div className="control-row">
        <div className="control">
          <label htmlFor="postal-code">Postal Code</label>
          <input
            type="number"
            name="postal-code"
            id="postal-code"
            defaultValue={formState.enteredValues?.["postal-code"]}
          />
        </div>

        <div className="control">
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            defaultValue={formState.enteredValues?.city}
          />
        </div>
      </div>

      {formState.errors?.length > 0 && (
        <ul>
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="modal-actions">
        <button className="text-button" onClick={handleFormClose}>
          Close
        </button>
        <button className="button" type="submit">
          {isPending ? "Submitting..." : "Submit Order"}
        </button>
      </div>
    </form>
  );
}

//FullName.trim() => it is not an empty string
/*!FullName.trim()*/ // => is an empty string.
