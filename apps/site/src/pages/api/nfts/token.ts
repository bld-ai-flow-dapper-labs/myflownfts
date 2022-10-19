import { getNFTByTokenId, NFT } from '@myflownfts/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NFT>
) {
  if (req.method !== 'GET') {
    return res.status(400);
  }

  const { chain, contract_address, token_id } = req.query;
  await getNFTByTokenId(
    chain as string,
    contract_address as string,
    token_id as string
  )
    .then((response) => response.json())
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      console.error(err);
      return res.status(400);
    });
}
