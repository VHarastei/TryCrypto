import { roundDec } from './../utils/roundDec';
import { BuySellType } from 'components/BuySellCard';
import { useEffect } from 'react';
import { useControlInput } from './useControlInput';

export const useControlBuySell = (action: BuySellType, currentPrice: number) => {
  const precision = currentPrice > 0.01 ? { amount: 6, total: 2 } : { amount: 0, total: 8 };
  const { value: amount, onChange: onChangeAmount } = useControlInput(20, precision.amount);
  const { value: total, onChange: onChangeTotal } = useControlInput(20, precision.total);

  const handleSetAmount = (val: string) => {
    onChangeAmount(val);
    const newTotal = +val * currentPrice;
    onChangeTotal(newTotal > 0 ? `${roundDec(newTotal, precision.total)}` : '');
  };
  const handleSetTotal = (val: string) => {
    onChangeTotal(val);
    const newAmount = +val / currentPrice;
    onChangeAmount(newAmount > 0 ? `${roundDec(newAmount, precision.amount)}` : '');
  };

  const handleClear = () => {
    handleSetAmount('');
  };

  useEffect(() => handleClear, [action]);

  return {
    amount,
    total,
    handleSetAmount,
    handleSetTotal,
    handleClear,
    precision,
  };
};
