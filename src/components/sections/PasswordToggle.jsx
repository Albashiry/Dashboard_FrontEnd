import { useRef, useState } from "react";

export default function PasswordToggle({ id, label, value, onChange }) {
  const passwordInputRef = useRef(null);
  const togglePasswordRef = useRef(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <input
        type={isPasswordVisible ? 'text' : 'password'}
        id={id}
        placeholder={`${label}...`}
        value={value}
        onChange={onChange}
        ref={passwordInputRef}
      />
      <i
        className={`password-toggle-icon fa ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}
        aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
        onClick={handleTogglePassword}
        ref={togglePasswordRef}
      />
    </>

  );
}