import { CurrencyDetail, ResponseDataTicket } from './types';

const apiBase = 'data.json';

function loadData<T>(api: string, query?: Record<string, string>): Promise<T> {
  //apiBase + api + '?' + new URLSearchParams(query || {}).toString()
  return fetch(apiBase)
    .then((response) => response.json())
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(`Failed to load the data from ${api}`, error);
      throw error;
    });
}

export const getTickers = (
  coins: string[],
  baseCurrency = 'USD',
): Promise<CurrencyDetail[]> =>
  loadData<ResponseDataTicket[]>('tickers', {
    symbols: coins
      .map(
        (c) => `t${c.toLocaleUpperCase()}${baseCurrency.toLocaleUpperCase()}`,
      )
      .join(','),
  }).then((data) =>
    data.map(
      ([
        symbol,
        bid,
        ,
        ask,
        ,
        ,
        dailyChangePercent,
        last,
        dailyVolume,
        dailyHigh,
        dailyLow,
      ]) =>
        ({
          symbol,
          bid,
          ask,
          last,
          dailyHigh,
          dailyLow,
          dailyVolume,
          dailyChangePercent,
        } as CurrencyDetail),
    ),
  );
