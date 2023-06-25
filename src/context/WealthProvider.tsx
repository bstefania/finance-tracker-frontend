import { createContext, useEffect, useState } from "react";
import { getWealth } from "../api/user";
import { Wealth } from "../types/database";

type WealthContextType = {
  wealth: Wealth | null;
  setWealth: (wealth: Wealth | null) => void;
  fetchWealth: () => void,

};

const WealthContext = createContext<WealthContextType>({
  wealth: null,
  setWealth: () => {},
  fetchWealth: () => {},
});

export const WealthProvider = ({ children }: { children: React.ReactNode }) => {
  const [wealth, setWealth] = useState<Wealth | null>(null);

  const fetchWealth = () => {
    getWealth().then(data => {
      setWealth(data);
    }).catch(err => {
      window.alert(err)
    });
  };

  useEffect(() => {
    fetchWealth()
  }, []);


  return (
    <WealthContext.Provider value={{ wealth, setWealth, fetchWealth }}>
      {children}
    </WealthContext.Provider>
  );
};

export default WealthContext;