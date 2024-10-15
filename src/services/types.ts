export type CurrencyDetail = {
  symbol: string;
  bid: number;
  ask: number;
  last: number;
  dailyHigh: number;
  dailyLow: number;
  dailyVolume: number;
  dailyChangePercent: number;
};

export type ResponseDataTicket = [
  string,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];
