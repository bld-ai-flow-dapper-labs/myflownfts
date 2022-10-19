import { getNFTByList, NFTByList } from '@myflownfts/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NFTByList>
): Promise<NextApiResponse<NFTByList>> {
  if (req.method !== 'GET') {
    return res.status(400);
  }

  const { nft_ids } = req.query;

  await getNFTByList(nft_ids as string)
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
