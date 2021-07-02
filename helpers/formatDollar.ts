export const formatDollar = (number: number, maximumSignificantDigits: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits,
  }).format(number);
};
