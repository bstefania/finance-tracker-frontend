export const euro = Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "EUR",
  maximumSignificantDigits: 2,
});

export const ron = Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "RON",
  maximumSignificantDigits: 2,
});

export const formatDecimals = (number: number | undefined) => {
  return Number(number).toFixed(2);
};
