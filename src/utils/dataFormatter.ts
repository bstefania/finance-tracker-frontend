export const euro = Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "EUR",
});

export const ron = Intl.NumberFormat("ro-RO", {
  style: "currency",
  currency: "RON",
});

export const formatDecimals = (number: number | undefined) => {
  return Number(number).toFixed(2);
};

export const formatDate = (date: string | Date) => {
  return new Date(date).toISOString().slice(0, 10);
};
