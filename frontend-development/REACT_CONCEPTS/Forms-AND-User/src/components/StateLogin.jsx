import Input from "./Input.jsx";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation.js";
import { useInput } from "./hooks/useInput.jsx";

export default function Login() {
  //Handling the validation for Email Input
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleOnBlur: handleEmailOnBlur,
    hasError: emailHasError,
  } = useInput("", (value) => isNotEmpty(value) && isEmail(value));

  //Handling the validation for the passWord Input
  const {
    value: passwordValue,
    handleInputChange: handlePassWordChange,
    handleOnBlur: handlePassWordEmailOnBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => hasMinLength(value, 6));

  function handleFormSubmit(event) {
    event.preventDefault();

    if (emailHasError || passwordHasError) {
      return;
    }

    console.log(emailValue, passwordValue);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={handleEmailOnBlur}
          onChange={handleEmailChange}
          value={emailValue}
          notValid={emailHasError}
          error="Please Enter an email Address"
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          minLength={6}
          onBlur={handlePassWordEmailOnBlur}
          onChange={handlePassWordChange}
          value={passwordValue}
          notValid={passwordHasError}
          error="Please Enter the right password"
        />
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button" onClick={handleFormSubmit}>
          Login
        </button>
      </p>
    </form>
  );
}

// NOTE: two ways of handling file Submission in React are:
// 1) change type attribute of the button wrapped within the form element from default value "submit" to "button" and use the onClick event handler to handle an event
// 2) use the onSubmit event handler on the form element to handle the form submission
// onSubmit event listener listens to any click on any of the buttons wrapped within the form and the execute the callback function assigned to it.
//[identifier]: value, //dynamically modifiying each of the object propert each time there is a change in the value entered for each property
// When there is no value change in the input value of any of the property that property returns its previous value
//BUT, when there is a change in the value of any of the property that property returns the new value
// NOTE: Validation at every key stroke is done using state. but combining it with lost focus can lead to a better validation setup
// NOTE: It is always important to validate your form upon submission to ensure unrequired datas are not submitted
