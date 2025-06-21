import { useRef, useState } from "react";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const [emailIsInvalid, setSetEmailIsInvalid] = useState(false);

  //function that is executed when a form is submitted
  function handleFormSubmit(event) {
    event.preventDefault(); // stops An element from carry out its default operation but rather carryout the javascript code or react program written below it.
    const enteredEmailValue = email.current.value;
    const enteredPasswordValue = password.current.value;

    const emailIsValid = enteredEmailValue.includes("@"); // emailIsValid is true of the input value contains "@" else it is false

    if (!emailIsValid) {
      setSetEmailIsInvalid(true);
      return; //ensures that any other codes that comes after the if-Statement does not execute if emailIsValid is false
    }

    //setting emailIsInvalid as false when the form is submitted if the input value contains "@"
    setSetEmailIsInvalid(false);
    console.log("Form has been submitted");
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={email} />
          {emailIsInvalid && (
            <p className="control-error">Please Enter a Valid email Address</p>
          )}
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={password} />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button" onClick={handleFormSubmit}>
          Login
        </button>
      </p>
    </form>
  );
}

// NOTE: the downside of using "ref" is that it is difficult to reset the value cleanly since the we are discouraged from using ref to manipulate the DOM.
// NOTE: hadling the input validation via form submission is easier when we use ref to fetch the value of the input.
