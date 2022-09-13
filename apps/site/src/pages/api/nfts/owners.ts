import { fetchFromApi } from './../utils';
import { NFTListResponse } from './../../../api/types';
import { BASE_API_URL } from '../../../constants';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NFTListResponse>
): Promise<NextApiResponse<NFTListResponse>> {
  if (req.method !== 'GET') {
    return res.status(400);
  }

  const { chains, wallet_addresses } = req.query;
  const url = `${BASE_API_URL}/nfts/owners?chains=${chains}&wallet_addresses=${wallet_addresses}`;

  await fetchFromApi(url)
    .then((response) => response.json())
    .then((response) => {
      return res.status(200).json({
        next: response.next,
        previous: response.previous,
        data: response.nfts,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(400);
    });
}
