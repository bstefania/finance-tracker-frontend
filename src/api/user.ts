import { BaseWealth, Wealth } from "../types/database";
import { HttpResponse } from "../types/responses";
import { customAxios } from "./axios";

export const initWealth = {
  total: 0,
  category: {
    income: {
      value: 0,
      percentage: 0,
    },
    savings: {
      value: 0,
      percentage: 0,
    },
    investments: {
      value: 0,
      percentage: 0,
    },
  },
};

type ApiWealth = {
  income: number;
  savings: number;
  investments: number;
  credit: number;
};

const adjustWealth = (data: ApiWealth) => {
  const total = data.income + data.savings + data.investments;

  const getPercentage = (total: number, part: number) => {
    return total > 0 ? (part / total) * 100 : 0;
  };

  return {
    total,
    category: {
      income: {
        value: data.income,
        percentage: getPercentage(total, data.income),
      },
      savings: {
        value: data.savings,
        percentage: getPercentage(total, data.savings),
      },
      investments: {
        value: data.investments,
        percentage: getPercentage(total, data.investments),
      },
    },
  };
};

export const getWealth = async (): Promise<Wealth> => {
  try {
    const res = await customAxios.get("/wealth");
    const data = res.data.data.wealth;
    return adjustWealth(data);
  } catch (error: any) {
    if (error.status === HttpResponse.NOT_FOUND) {
      throw Error("Wealth info not found.");
    } else {
      throw Error("Wealth info couldn't be retrieved.");
    }
  }
};

export const patchWealth = async (newValues: BaseWealth) => {
  try {
    const res = await customAxios.patch("/wealth", newValues);
    const data = res.data.data.wealth;
    return adjustWealth(data);
  } catch (error: any) {
    if (error.status === HttpResponse.NOT_FOUND) {
      throw Error("Wealth info not found.");
    } else {
      throw Error("Wealth info couldn't be updated.");
    }
  }
};
