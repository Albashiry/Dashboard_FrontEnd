import { useState } from "react";
import { Forms } from '../sections';

const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Forms
      button="Create"
      endPoint="user/create"
      name={name}
      email={email}
      hasLocalStorage={false}
      navigate="/dashboard/users/create"
    />
  );
}
export default CreateUser;