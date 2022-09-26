import type { NextApiRequest, NextApiResponse } from 'next';
import { RefreshResponse } from '../../../api/types';
import { BASE_API_URL } from '../../../constants';
import { postToApi } from '../utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RefreshResponse>
): Promise<NextApiResponse<RefreshResponse>> {
  if (req.method !== 'POST') {
    res.status(400).send({ message: 'Only POST requests allowed' });
    return;
  }

  const { chain, contract_address, token_id } = req.query;
  const url = `${BASE_API_URL}/nfts/refresh/${chain}/${contract_address}/${token_id}`;

  await postToApi(url)
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
