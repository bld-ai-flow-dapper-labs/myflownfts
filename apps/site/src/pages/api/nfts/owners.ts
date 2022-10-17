import { BASE_API_URL, fetchFromApi, NFTListResponse } from '@data-access';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NFTListResponse>
): Promise<NextApiResponse<NFTListResponse>> {
  if (req.method !== 'GET') {
    return res.status(400);
  }

  const { chains, wallet_addresses } = req.query;
  const url = `${BASE_API_URL}/nfts/owners?chains=${chains}&wallet_addresses=${wallet_addresses}&count=1`;

  await fetchFromApi(url)
    .then((response) => response.json())
    .then((response) => {
      return res.status(200).json({
        next: response.next,
        previous: response.previous,
        count: response.count,
        data: response.nfts,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(400);
    });
}
