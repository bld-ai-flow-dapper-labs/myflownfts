import { BASE_API_URL, fetchFromApi, NFTListResponse } from '@data-access';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NFTListResponse>
) {
  if (req.method !== 'GET') {
    return res.status(400);
  }

  const { chain, chains, contract_address, query } = req.query;

  let url = `${BASE_API_URL}/nfts?chains=${chains}`; // get all NFTs

  if (query) {
    url = query.toString(); // used for 'next' or 'previous' queries
  } else if (chain && contract_address) {
    url = `${BASE_API_URL}/nfts/${chain}/${contract_address}`; // get NFTs by Contract
  }

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
