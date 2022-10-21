import { DEFAULT_FEATURED_NFTS, getNFTByList } from '@myflownfts/data-access';
import PageLanding from '../components/PageLanding';
import defaultNfts from '../components/PageLanding/json/nfts.json';

export default PageLanding;

export async function getStaticProps() {
  const nftIds = process.env.FEATURED_NFTS ?? DEFAULT_FEATURED_NFTS?.join(',');
  let nfts = defaultNfts;

  await getNFTByList(nftIds)
    .then((response) => response.json())
    .then((response) => {
      nfts = response.nfts;
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
