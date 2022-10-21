import { getNFTByTokenId } from '@myflownfts/data-access';
import PageViewNFT from '@myflownfts/site/components/PageViewNFT';
import type { NextApiRequest } from 'next';

export default PageViewNFT;

export async function getServerSideProps(req: NextApiRequest) {
  const { contract_address, token_id } = req.query;
  let SSRToken;

  await getNFTByTokenId('flow', contract_address as string, token_id as string)
    .then((response) => response.json())
    .then((response) => {
      SSRToken = response;
    })
    .catch((err) => {
      console.error(err);
    });

  return {
    props: {
      SSRToken,
    },
  };
}
