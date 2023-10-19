import { Transaction, TransactionInput, TransactionType } from "../types/database";
import { HttpResponse } from "../types/responses";
import { customAxios } from "./axios";

export type Amounts = Record<
  string,
  Record<string, { amount: number; color: string }>
>;

export const getAmounts = async (type: TransactionType) => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  try {
    const res = await customAxios.get("/amounts", {
      params: {
        type,
        createdAtStart: firstDayOfMonth.toString(),
      },
    });
    return res.data.data as Amounts;
  } catch (error: any) {
    if (error.status === HttpResponse.NOT_FOUND) {
      throw Error("Amounts info not found.");
    } else {
      throw Error("Amounts info couldn't be retrieved.");
    }
  }
};

export const postTransactions = async (data: TransactionInput) => {
  try {
    const res = await customAxios.post("/transactions", data);
    return res.data.data as Transaction;
  } catch (error: any) {
    if (error.status === HttpResponse.NOT_FOUND) {
      throw Error("Transaction info not found.");
    } else {
      throw Error("Transaction info couldn't be updated.");
    }
  }
}
