import { DEFAULT_FEATURED_NFTS, getNFTsByList } from '@myflownfts/data-access';
import PageLanding from '../components/PageLanding';
import defaultNfts from '../components/PageLanding/json/nfts.json';

export default PageLanding;

export async function getStaticProps() {
  const nftIds = process.env.FEATURED_NFTS?.split(',') ?? DEFAULT_FEATURED_NFTS;
  let nfts = defaultNfts;

  await getNFTsByList(nftIds)
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
