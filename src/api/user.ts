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
  return {
    total,
    category: {
      wallet: {
        value: data.wallet,
        percentage: total > 0 ? (data.wallet / total) * 100 : 0,
      },
      savings: {
        value: data.savings,
        percentage: total > 0 ? (data.savings / total) * 100 : 0,
      },
      investments: {
        value: data.investments,
        percentage: total > 0 ? (data.investments / total) * 100 : 0,
      },
    },
  };
}

export const getWealth = async () => {
  console.log("gfdgdg")
  const res = await customAxios.get("/wealth")
  console.log(res)
  const data = res.data.data.wealth;
  return adjustWealth(data)
};

