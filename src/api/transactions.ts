import { customAxios } from "./axios";

export type Amounts = Record<string, Record<string, {amount: number, color: string}>>

export const getAmounts = async () => {
  const res = await customAxios.get("/amounts", {
    params: {
      type: "expense"
    }
  })
  return res.data.data as Amounts;
} 