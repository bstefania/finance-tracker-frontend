import { customAxios } from "./axios";

export type Amounts = Record<string, Record<string, {amount: number, color: string}>>

export const getAmounts = async () => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  
  const res = await customAxios.get("/amounts", {
    params: {
      type: "expense",
      createdAtStart: firstDayOfMonth.toString()
    }
  })
  return res.data.data as Amounts;
} 