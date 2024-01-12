import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PasswordToggle } from '../sections';
import axios from 'axios';
import { User } from '../context';

const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [acceptPassword, setAcceptPassword] = useState(true);
  const [submited, setSubmited] = useState(false);
  const [matchPassword, setMatchPassword] = useState(true);
  const [errorStatus, setErrorStatus] = useState("");

  const nav = useNavigate();
  const context = useContext(User);
  const token = context.auth.token;

  async function validatePassword(event) {
    let pass = event.target.password.value; //get password by id
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.{8,32}$)/; // Create a regex object directly
    let test = regex.test(pass);
    setAcceptPassword(test);
    (acceptPassword && passwordConfirmation === password) && setMatchPassword(test);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await validatePassword(event);
    setSubmited(true);

    try {
      let response = await axios.post("http://127.0.0.1:8000/api/user/create", {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation
      },
        {
          headers:
          {
            Authorization: "Bearer " + token
          }
        });
      if (response.status === 200) {
        nav('/dashboard/users/create');
      }
    } catch (error) {
      if (error.response.status === 422) {
        setErrorStatus(error.response.status);
      }
    }
  }

  return (
    <>
      <div className="signup">
        <form action="" className="form shadow" style={{ width: "100%" }} onSubmit={handleSubmit}>
          <label htmlFor="name">Name: </label>
          <span>
            <input
              type="text"
              id="name"
              placeholder="Name..."
              value={name}
              autoComplete="true"
              onChange={(e) => setName(e.target.value)}
            />
            {submited && name === "" && name.length < 2 && <p className='error'>username is required</p>}
          </span>

          <label htmlFor="email">Email: </label>
          <span>
            <input
              type="email"
              id="email"
              placeholder="Email..."
              required="required"
              value={email}
              autoComplete="true"
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorStatus("");
              }}
            />
            {submited && errorStatus === 422 && <p className='error'>The email has already been taken.</p>}
          </span>

          <label htmlFor="password">Password: </label>
          <span className='user-box'>
            <PasswordToggle id="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {submited && !acceptPassword && <p className='error'>must fill a valid password</p>}
          </span>

          <label htmlFor="repeatPassword">repeat Password: </label>
          <span className='user-box'>
            <PasswordToggle id="repeatPassword" label="Repeat Password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
            {submited && !matchPassword && <p className='error'>password does not match</p>}
          </span>

          <span className="register">
            <button type="submit" value="register">
              Create User
            </button>
          </span>
        </form>
      </div>
    </>
  )
}

export default CreateUser;