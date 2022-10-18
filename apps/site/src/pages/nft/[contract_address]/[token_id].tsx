import { BASE_API_URL, fetchFromApi } from '@myflownfts/data-access';
import PageViewNFT from '@myflownfts/site/components/PageViewNFT';
import type { NextApiRequest } from 'next';

export default PageViewNFT;

export async function getServerSideProps(req: NextApiRequest) {
  const { contract_address, token_id } = req.query;
  const url = `${BASE_API_URL}/nfts/flow/${contract_address}/${token_id}`;
  let SSRToken;

  await fetchFromApi(url)
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
