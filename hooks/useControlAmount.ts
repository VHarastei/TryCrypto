import React from 'react';

export const useControlAmount = (intPrecision: number, decPrecision: number) => {
  const [amount, setAmount] = React.useState<string>('');

  return {
    amount,
    setAmount,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (val[val.length - 1] === ' ' || isNaN(+val)) return;

      const arr = val.split('.');
      if (arr[0].length <= intPrecision) {
        if (arr.length > 1) {
          if (arr[1].length <= decPrecision) {
            setAmount(val);
          }
        } else setAmount(val);
      }
    },
  };
};
