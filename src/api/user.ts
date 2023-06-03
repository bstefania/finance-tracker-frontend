// export const init = {
//   total: 0,
//   category: {
//     wallet: {
//       value: 0,
//       percentage: 0,
//     },
//     savings: {
//       value: 0,
//       percentage: 0,
//     },
//     investments: {
//       value: 0,
//       percentage: 0,
//     },
//   },
// }

import { BaseWealth, Wealth } from "../types/database";
import { customAxios } from "./axios";

export const adjustWealth = (data: any) => {
  const total = data.income + data.savings + data.investments + data.credit;
  console.log(data.income , data.savings , data.investments , data.credit)
  const getPercentage = (total: number, part: number) => {
    return total > 0 ? (part / total) * 100 : 0
  }

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
      credit: {
        value: data.cred,
        percentage: getPercentage(total, data.credit),
      }
    },
  };
}

export const getWealth = async (): Promise<Wealth> => {
  const res = await customAxios.get("/wealth")
  const data = res.data.data.wealth;
  return adjustWealth(data)
};

export const patchWealth = async (newValues: BaseWealth) => {
  const res = await customAxios.patch("/wealth", newValues)
  const data = res.data.data.wealth;
  return adjustWealth(data)
} 