import {
  Transaction,
  TransactionInput,
  TransactionType,
} from "../types/database";
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
    throw Error(
      error.response?.data?.message ?? "Amounts info couldn't be retrieved!"
    );
  }
};

export const getTransactions = async () => {
  try {
    const res = await customAxios.get("/transactions");
    return res.data.data as Transaction[];
  } catch (error: any) {
    throw Error(
      error.response?.data?.message ?? "Transactions couldn't be retrieved!"
    );
  }
};

export const postTransactions = async (data: TransactionInput) => {
  try {
    const res = await customAxios.post("/transactions", data);
    return res.data.data as Transaction;
  } catch (error: any) {
    throw Error(
      error.response?.data?.message ?? "Transaction couldn't be created!"
    );
  }
};
