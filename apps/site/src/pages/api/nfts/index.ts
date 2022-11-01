import {
  getNFTs,
  getNFTsByContract,
  getRawQuery,
  NFTListResponse,
} from '@myflownfts/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NFTListResponse>
) {
  if (req.method !== 'GET') {
    return res.status(400);
  }

  const { chain, chains, contract_address, query } = req.query;

  if (query) {
    /* used for 'next' or 'previous' queries */
    await getRawQuery(query.toString())
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
  } else if (chain && contract_address) {
    await getNFTsByContract(chain as string, contract_address as string)
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
  } else {
    await getNFTs(chains as string)
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
}
