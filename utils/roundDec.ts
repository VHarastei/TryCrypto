export const roundDec = (number: number, precision: number) => {
  let mult = Math.pow(10, precision);
  return Math.floor(number * mult) / mult;
};
