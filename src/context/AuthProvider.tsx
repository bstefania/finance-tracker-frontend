import { createContext, useState } from "react";

type AuthContextType = {
  auth: any;
  setAuth: (auth: any) => void;
};

const AuthContext = createContext<AuthContextType>({
  auth: {},
  setAuth: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState({});
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
