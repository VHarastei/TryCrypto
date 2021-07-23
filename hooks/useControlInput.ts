import React from 'react';

export const useControlInput = (intPrecision: number, decPrecision: number) => {
  const [value, setValue] = React.useState<string>('');

  return {
    value,
    onChange: (val: string) => {
      if (val[val.length - 1] === ' ' || isNaN(+val)) return;

      const arr = val.split('.');
      if (arr[0].length <= intPrecision) {
        if (arr.length > 1) {
          if (arr[1].length <= decPrecision) {
            setValue(val);
          }
        } else setValue(val);
      }
    },
  };
};
