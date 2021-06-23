export const controlAmount = (str: string, intPrecision: number, decPrecision: number) => {
  if (str[str.length - 1] === ' ' || isNaN(+str)) return;

  const arr = str.split('.');
  if (arr[0].length < 4) {
    if (arr.length > 1) {
      if (arr[1].length < 3) {
        //setAmount(str);
        return str;
      }
    } else {
      //setAmount(str);
      return str;
    }
  }
};
