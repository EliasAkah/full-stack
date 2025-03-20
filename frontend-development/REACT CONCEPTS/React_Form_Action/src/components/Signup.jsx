import { useActionState } from "react";

import {
  isEmail,
  isNotEmpty,
  hasMinLength,
  isEqualToOtherValue,
} from "../util/validation.js";

//if a function is not using any component dependent variable it is more optimaly that we place the function outside the component
// to prevent it continous execution whenever the component is re-rendered
function signupAction(prevFormState, formData) {
  //extracting the value of each form element and assigning it to to their respective binding(variable)
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const firstName = formData.get("first-name");
  const lastName = formData.get("last-name");
  const role = formData.get("role");
  const acquisitionChannel = formData.getAll("acquisition");
  const terms = formData.get("terms");

  const errors = [];

  //carrying out validation for each of the form element inputs
  if (!isEmail(email) || !isNotEmpty(email)) {
    errors.push("please, enter a valid email");
  }

  if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
    errors.push("please, enter a valid password");
  }

  if (!isEqualToOtherValue(password, confirmPassword)) {
    errors.push("please Enter the same password");
  }

  if (!isNotEmpty(firstName)) {
    errors.push("Enter your first name");
  }

  if (!isNotEmpty(lastName)) {
    errors.push("Enter your last name");
  }

  if (!role) {
    errors.push("please select a role");
  }

  if (acquisitionChannel.length === 0) {
    errors.push("you must select at least one Option");
  }

  if (!terms) {
    errors.push("you must accept our terms and condition");
  }

  if (errors.length > 0) {
    return {
      errors,
      enterValues: {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        role,
        acquisitionChannel,
        terms,
      },
    }; //the value given to the current formState when the form is submitted an error occured
  }

  return { errors: null }; //the value given to the current formState when the form is submitted and no error occured
}

export default function Signup() {
  const [formState, formAction] = useActionState(signupAction, {
    errors: null,
  });

  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          defaultValue={formState.enterValues?.email}
        />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            defaultValue={formState.enterValues?.password}
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultValue={formState.enterValues?.confirmPassword}
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            defaultValue={formState.enterValues?.firstName}
          />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            defaultValue={formState.enterValues?.lastName}
          />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select
          id="role"
          name="role"
          defaultValue={formState.enterValues?.role}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked={formState.enterValues?.acquisitionChannel.includes(
              "google"
            )}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formState.enterValues?.acquisitionChannel.includes(
              "friend"
            )}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="other"
            name="acquisition"
            value="other"
            defaultChecked={formState.enterValues?.acquisitionChannel.includes(
              "other"
            )}
          />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input
            type="checkbox"
            id="terms-and-conditions"
            name="terms"
            defaultChecked={formState.enterValues?.terms}
          />
          I agree to the terms and conditions
        </label>
      </div>

      {formState.errors?.length > 0 && (
        <>
          {console.log(formState.errors)}
          <ul className="error">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </>
      )}
      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
