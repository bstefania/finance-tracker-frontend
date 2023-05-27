import { useContext } from "react";
import WealthContext from "../context/WealthProvider";
 
const useWealth = () => {
  return useContext(WealthContext)
}

export default useWealth