import { createContext, useEffect, useState } from "react";
import { getWealth, initWealth } from "../api/user";
import { Wealth } from "../types/database";
import { showNotification, Notification } from "../utils/errorHandling";

type WealthContextType = {
  wealth: Wealth | null;
  setWealth: (wealth: Wealth | null) => void;
  fetchWealth: () => void;
};

// initial data
const WealthContext = createContext<WealthContextType>({
  wealth: null,
  setWealth: () => {},
  fetchWealth: () => {},
});

export const WealthProvider = ({ children }: { children: React.ReactNode }) => {
  const [wealth, setWealth] = useState<Wealth | null>(null);

  const fetchWealth = () => {
    getWealth()
      .then((data: Wealth) => {
        setWealth(data);
      })
      .catch((error: any) => {
        showNotification(error.message, Notification.ERROR);
        setWealth(initWealth)
      });
  };

  useEffect(() => {
    fetchWealth();
  }, []);

  return (
    <WealthContext.Provider value={{ wealth, setWealth, fetchWealth }}>
      {children}
    </WealthContext.Provider>
  );
};

export default WealthContext;
