import { ExchangeRates, getExchangeRates } from '@myflownfts/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExchangeRates>
) {
  if (req.method !== 'GET') {
    return res.status(400);
  }

  await getExchangeRates()
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
