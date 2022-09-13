import { fetchFromApi } from './../utils';
import { NFT } from '../../../api/types';
import { BASE_API_URL } from '../../../constants';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NFT>
) {
  if (req.method !== 'GET') {
    return res.status(400);
  }

  const { chain, contract_address, token_id } = req.query;

  const url = `${BASE_API_URL}/nfts/${chain}/${contract_address}/${token_id}`;

  await fetchFromApi(url)
    .then((response) => response.json())
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      console.error(err);
      return res.status(400);
    });
}
