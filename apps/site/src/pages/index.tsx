import {
  BASE_API_URL,
  DEFAULT_FEATURED_NFTS,
  fetchFromApi,
} from '@myflownfts/data-access';
import PageLanding from '../components/PageLanding';
import defaultNfts from '../components/PageLanding/json/nfts.json';

export default PageLanding;

export async function getStaticProps() {
  const nftIds = process.env.FEATURED_NFTS?.split(',') ?? DEFAULT_FEATURED_NFTS;
  const url = `${BASE_API_URL}/nfts/assets?nft_ids=${nftIds}`;
  let nfts = defaultNfts;

  await fetchFromApi(url)
    .then((response) => response.json())
    .then((response) => {
      nfts = response.nfts;
      if (nftIds) {
        nfts.sort(
          (a, b) => nftIds.indexOf(a.nft_id) - nftIds.indexOf(b.nft_id)
        );
      }
    })
    .catch((err) => {
      console.error(err);
    });

  return {
    props: {
      nfts,
    },
  };
}
