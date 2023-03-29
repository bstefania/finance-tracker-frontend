import { User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth as firebaseAuth } from "../config/firebase";

type AuthContextType = {
  auth: User | null;
  setAuth: (auth: User | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<User | null>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      console.log(user)
      setAuth(user)
      setPending(false)
    });
  }, []);

  if(pending){
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;