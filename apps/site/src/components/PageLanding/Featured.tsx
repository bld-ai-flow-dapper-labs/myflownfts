import useTranslation from 'next-translate/useTranslation';
import { useEffect, useRef, useState } from 'react';
import { getNFTByList } from '../../api';
import { NFT } from '../../api/types';
import { FEATURED_NFTS } from '../../constants';
import { ScrollButtons } from '../common';
import { ReactComponent as StarIcon } from '../common/images/icon-section-star.svg';
import NFTCard from '../common/NFTCard';

export default function Featured() {
  const { t } = useTranslation();
  const scrollRef = useRef(null);
  const [featured, setFeatured] = useState<NFT[]>();
  const [isLoading, setIsLoading] = useState(true);

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  useEffect(() => {
    const fetchFeatured = async () => {
      if (Array.isArray(FEATURED_NFTS)) {
        const featuredNFTList = FEATURED_NFTS.map((item) =>
          item.replace('/', '.').replace('/', '.').replace(/^/, 'flow.')
        ).join(',');
        const { nfts } = await getNFTByList(featuredNFTList);
        setFeatured(nfts);
        setIsLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="flex flex-col gap-[3.375rem] pt-12 xl:pt-[8.375rem] px-5 xl:px-[16.75rem] lg:pb-[5.25rem]">
      <div className="flex items-center justify-center lg:py-4 lg:justify-between">
        <div className="flex items-center gap-[1.125rem] lg:gap-6 2xl:gap-12">
          <StarIcon className="text-yellow" />
          <span className="font-bold text-white text-mobile-section lg:text-h3 2xl:text-section">
            {t('pages.landing.featuredNFTs')}
          </span>
          <StarIcon className="text-yellow" />
        </div>
        <ScrollButtons
          className="hidden lg:flex"
          scroll={scroll}
          href="https://www.flowverse.co/flow-nfts"
        />
      </div>
      <div
        className="grid grid-flow-col grid-rows-1 -mt-8 xl:mt-0 xl:grid-rows-2 gap-6 pb-6 xl:pb-[3.875rem] overflow-x-scroll scrollbar-mobile lg:scrollbar scroll-smooth"
        ref={scrollRef}
      >
        {!isLoading &&
          featured &&
          featured.map((item, index) => {
            return (
              <NFTCard
                key={item?.nft_id}
                chain={item?.chain}
                contract={item?.contract?.name}
                creatorName={
                  item?.collection?.twitter_username ??
                  item?.collection?.name ??
                  'Unknown'
                }
                creatorAvatar={
                  item?.collection?.image_url ??
                  item?.previews?.image_small_url ??
                  '/not_supported.png'
                }
                token_id={item?.token_id}
                name={item?.name}
                image_url={
                  index % 7 === 0
                    ? item?.previews?.image_large_url ?? '/not_supported.png'
                    : item?.previews?.image_medium_url ?? '/not_supported.png'
                }
                url={`/nft/${item?.contract_address}/${item?.token_id}`}
                big={index % 7 === 0 ? true : false}
              />
            );
          })}
      </div>
      <ScrollButtons
        className="flex -mt-[1.875rem] pb-12 lg:hidden"
        scroll={scroll}
        mobile
        href="https://www.flowverse.co/flow-nfts"
      />
    </div>
  );
}

// export async function getStaticProps() {
//   const data = await getNFTByList(FEATURED_NFTS);
//   return {
//     props: { data, text: 'heloo' }, // will be passed to the page component as props
//   };
// }
