import React from 'react';
import { styled, Typography } from '@mui/material';

// There are no issues for you to fix in this file
// Please ignore this file
const toCoinTicker = (s: string): string =>
  s.replace(/^t/, '').replace(/USD$/, '');

const IconImage = styled('img')`
  float: left; // sorry lol
  margin-right: 5px;
`;

const Coin: React.FC<{ children: string }> = ({ children }) => {
  const coin = toCoinTicker(children);
  return (
    <Typography variant={'body1'} fontWeight={700}>
      <IconImage
        alt={coin}
        src={`https://res.cloudinary.com/zignaly/image/upload/c_scale,w_24,h_24,r_max/coins-binance/${coin}`}
      />{' '}
      {coin}
    </Typography>
  );
};

export default Coin;
