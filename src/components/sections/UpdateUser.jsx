import { useEffect, useState } from "react";
import axios from "axios";
import { Forms } from "../sections";

const UpdateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [passwordR, setPasswordR] = useState('');
  // const [submited, setSubmited] = useState(false);
  // const [acceptPassword, setAcceptPassword] = useState(true);
  // const [matchPassword, setMatchPassword] = useState(true);

  const id = window.location.pathname.split('/').slice(-1)[0];  // get the user from the url
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`)
      .then(response => response.json())
      .then(data => {
        setName(data[0].name);
        setEmail(data[0].email);
      })
  }, []);

  return (
    <Forms
      button="Update"
      name={name}
      email={email}
      endPoint={`user/update/${id}`}
      navigate="/dashboard/users"
      hasLocalStorage = {false}
    />
  );
}
export default UpdateUser;