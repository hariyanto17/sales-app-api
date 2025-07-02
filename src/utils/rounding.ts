export const rounding = (val: number, fractionDigits: number = 2): number => {
  return Number(val.toFixed(fractionDigits));
};
