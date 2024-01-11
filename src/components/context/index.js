// Context
import { createContext, useState } from "react";

const Theme = createContext(null);

const User = createContext({});
function UserProvider({ children }) {
   const [auth, setAuth] = useState({});
   return (
      <User.Provider value={{ auth, setAuth }}>{children}</User.Provider>
   );
}

export {
   Theme,
   User,
   UserProvider
}