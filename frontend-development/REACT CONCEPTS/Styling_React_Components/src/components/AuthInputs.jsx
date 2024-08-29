import { useState } from 'react';

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === 'email') {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes('@');
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  //dynamic and conditional styling in tailwind

  let labelClass = "block mb-2 text-xs font-bold tracking-widest font-serif uppercase";
  let inputClass = "w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow";

  let invalid = emailNotValid || passwordNotValid;

  if(invalid){
    labelClass += " text-red-200";
    inputClass += " bg-red-200";
  }else{
    labelClass += " text-tertiary";
    inputClass += " bg-stone-300";
  }
  
  return (
    <div className = "w-full max-w-md p-8 my-0 mx-auto shadow rounded-lg bg-custom-gradient text-white">
      <div className=" flex flex-col gap-2 mb-6">
        <p>
          <label className = {labelClass}>Email</label>
          <input
            type="email"
            className={inputClass}
            onChange={(event) => handleInputChange('email', event.target.value)}
          />
        </p>
        <p>
          <label className = {labelClass}>Password</label>
          <input
            type="password"
            className={inputClass}
            onChange={(event) =>
              handleInputChange('password', event.target.value)
            }
          />
        </p>
      </div>
      <div className="flex justify-end gap-4">
        <button type="button" className="text-fourth border-0 font-serif text-sixth">
          Create a new account
        </button>
        <button className="py-4 px-8 font-semibold uppercase rounded text-fifth bg-fourth border-0 hover:bg-sixth font-serif" onClick={handleLogin}>Sign In</button>
      </div>
    </div>
  );
}
