import type { NextApiRequest, NextApiResponse } from 'next';
import { BASE_API_URL } from '../../../constants';
import { NFTByList } from './../../../api/types';
import { fetchFromApi } from './../utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NFTByList>
): Promise<NextApiResponse<NFTByList>> {
  if (req.method !== 'GET') {
    return res.status(400);
  }

  const { nft_ids } = req.query;
  const url = `${BASE_API_URL}/nfts/assets?nft_ids=${nft_ids}`;
  await fetchFromApi(url)
    .then((response) => response.json())
    .then((response) => {
      return res.status(200).json({
        nfts: response.nfts,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(400);
    });
}
