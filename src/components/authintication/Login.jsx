import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Header, PasswordToggle } from '../sections';
import { User } from '../context';
import axios from 'axios';
import Cookies from 'universal-cookie';

export default function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submited, setSubmited] = useState(false);
  const [acceptPassword, setAcceptPassword] = useState(true);
  const [errorStatus, setErrorStatus] = useState("");

  const nav = useNavigate();
  // get user
  const userNow = useContext(User);
  // Cookie
  const cookie = new Cookies();

  // const passwordFieldRef = useRef(null); // Use useRef to reference the password field
  // const togglePasswordRef = useRef(null);
  // const handleTogglePassword = () => {
  //   if (passwordFieldRef.current.type === 'password') {
  //     passwordFieldRef.current.type = 'text';
  //     togglePasswordRef.current.classList.remove("fa-eye");
  //     togglePasswordRef.current.classList.add("fa-eye-slash");
  //   } else {
  //     passwordFieldRef.current.type = 'password';
  //     togglePasswordRef.current.classList.remove("fa-eye-slash");
  //     togglePasswordRef.current.classList.add("fa-eye");
  //   }
  // };

  async function validatePassword(event) {
    let pass = event.target.password.value; //get password by id
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.{8,32}$)/; // Create a regex object directly
    let test = regex.test(pass);
    setAcceptPassword(test);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmited(true);
    await validatePassword(event);

    try {
      let response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password
      });
      if (response.status === 200) {
        const token = response.data.data.token;
        cookie.set("Bearer", token);
        const userDetails = response.data.data.user;
        userNow.setAuth({ token, userDetails });
        nav('/dashboard');
      }
    } catch (error) {
      if (error.response.status === 422 || error.response.status === 401) {
        setErrorStatus(error.response.status);
      }
    }
  }

  return (
    <>
      <Header />
      <div className="signup login">
        <form action="" className="form shadow" onSubmit={handleSubmit}>
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
            {submited && errorStatus && <p className='error'>Error {errorStatus}</p>}
          </span>

          <label htmlFor="password">Password: </label>
          <span className='user-box'>
            {/* <input
              type="password"
              id="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              ref={passwordFieldRef}
            />
            <i className="password-toggle-icon fa fa-eye" ref={togglePasswordRef} onClick={handleTogglePassword}></i> */}
            <PasswordToggle id="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {submited && !acceptPassword && <p className='error'>must fill a valid password</p>}
          </span>
          <span className="register">
            <button type="submit" value="register">
              Login
            </button>
          </span>
        </form>
      </div>
    </>
  )
}