import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const config = {
    headers: { Authorization: `Bearer ${auth?.accessToken}` },
  };

  return (
    <AuthContext.Provider value={{ auth, config, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
