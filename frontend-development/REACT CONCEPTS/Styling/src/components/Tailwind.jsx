import {useState} from 'react';
import Form from  './TailwindLabel.jsx'


export default function Tailwind() {
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

  return (
    <div className = 'w-full max-w-md p-[2rem] my-0 mx-auto rounded-[0.5rem] shadow-[0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)] bg-linear-180 from-[#474232] from-0% to-[#28271c] to-100% text-white'>
      <div className = 'flex flex-col gap-x-[0.5rem] mb-[1.5rem]'>
            <Form
                invalid = {emailNotValid}
                label = 'Email'
                type="email"
                onChange={(event) => handleInputChange('email', event.target.value)}
            />
            <Form
                label = 'Password'
                invalid = {passwordNotValid}
                type="password"
                onChange={(event) =>
                handleInputChange('password', event.target.value)
                }
            />
        </div>
        <div className="flex justify-end gap-[1rem]">
            <button type="button" className='cursor-pointer font-semibold uppercase text-[#f0b322] bg-[none] border-none hover:text-[#f0920e]'>
            Create a new account
            </button>
            <button className='cursor-pointer  border-none py-[1rem] px-[2rem] rounded-sm text-[#1f2937] bg-[#f0b322] hover:bg-[#f0920e]' onClick={handleLogin}>Sign In</button>
        </div>
    </div>
  );
}
