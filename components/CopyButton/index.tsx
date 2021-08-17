import { Button } from 'components/Button';
import React, { useState } from 'react';

type PropsType = {
  refCode: string;
  className?: string;
  fullWidth?: boolean;
};

export const CopyButton: React.FC<PropsType> = React.memo(({ refCode, className, fullWidth }) => {
  const [copied, setCopied] = useState(false);
  const referralLink = `localhost:3000/register?ref=${refCode}`;
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Button onClick={handleCopy} fullWidth={fullWidth} className={className}>
      {!copied ? 'Copy' : 'Copied'}
    </Button>
  );
});
