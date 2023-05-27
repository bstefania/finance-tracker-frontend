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

import { customAxios } from "./axios";

export const adjustWealth = (data: any) => {
  const total = data.wallet + data.savings + data.invesments;

  const getPercentage = (total: number, part: number) => {
    return total > 0 ? (part / total) * 100 : 0
  }

  return {
    total,
    category: {
      wallet: {
        value: data.wallet,
        percentage: getPercentage(total, data.wallet),
      },
      savings: {
        value: data.savings,
        percentage: getPercentage(total, data.savings),
      },
      investments: {
        value: data.investments,
        percentage: getPercentage(total, data.invesments),
      },
    },
  };
}

export const getWealth = async () => {
  const res = await customAxios.get("/wealth")
  console.log(res)
  const data = res.data.data.wealth;
  return adjustWealth(data)
};

