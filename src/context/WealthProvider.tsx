import { createContext, useEffect, useState } from "react";
import { getWealth } from "../api/user";
import { Wealth } from "../types/database";

type WealthContextType = {
  wealth: Wealth | null;
  setWealth: (wealth: Wealth | null) => void;
};

const WealthContext = createContext<WealthContextType>({
  wealth: null,
  setWealth: () => {},
});

export const WealthProvider = ({ children }: { children: React.ReactNode }) => {
  const [wealth, setWealth] = useState<Wealth | null>(null);

  useEffect(() => {
    getWealth().then(data => {
      setWealth(data)
    })
  }, []);

  return (
    <WealthContext.Provider value={{ wealth, setWealth }}>
      {children}
    </WealthContext.Provider>
  );
};

export default WealthContext;