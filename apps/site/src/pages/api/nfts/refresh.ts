import { postRefreshMetadata, RefreshResponse } from '@myflownfts/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RefreshResponse>
): Promise<NextApiResponse<RefreshResponse>> {
  if (req.method !== 'POST') {
    res.status(400).send({ message: 'Only POST requests allowed' });
    return;
  }

  const { chain, contract_address, token_id } = req.query;

  await postRefreshMetadata(
    chain as string,
    contract_address as string,
    token_id as string
  )
    .then((response) => response.json())
    .then((response) => {
      return res.status(200).json({
        message: response.message,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(400);
    });
}
