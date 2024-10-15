import React from 'react';
import { Typography } from '@mui/material';

const Money: React.FC<{ children: number | string }> = ({ children }) => {
  return (
    <Typography textAlign='right' variant={'body2'}>
      {Number(+children).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </Typography>
  );
};

export default Money;
