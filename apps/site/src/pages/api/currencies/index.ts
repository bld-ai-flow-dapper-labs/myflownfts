import {
  CURRENCY_API_URL,
  ExchangeRates,
  fetchFromCurrencyApi,
} from '@data-access';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExchangeRates>
) {
  if (req.method !== 'GET') {
    return res.status(400);
  }

  const url = `${CURRENCY_API_URL}/price?fsym=FLOW&tsyms=USD,ETH`; // get Flow to USD and ETH pricing

  await fetchFromCurrencyApi(url)
    .then((response) => response.json())
    .then((response) => {
      return res.status(200).json({
        usd: response.USD,
        eth: response.ETH,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(400);
    });
}
