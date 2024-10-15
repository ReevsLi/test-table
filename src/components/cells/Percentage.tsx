import React from 'react';
import { Typography } from '@mui/material';

const Percentage: React.FC<{ children: number | string }> = ({ children }) => {
  return (
    <Typography
      textAlign='right'
      variant={'body2'}
      color={+children > 0 ? 'green' : 'red'}
    >
      {(Number(+children) * 100).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) + '%'}
    </Typography>
  );
};

export default Percentage;
