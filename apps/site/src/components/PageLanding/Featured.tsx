import { NFT } from '@myflownfts/data-access';
import { isLandingPageLoadedAtom } from '@myflownfts/site/atoms';
import { useAtom } from 'jotai';
import useTranslation from 'next-translate/useTranslation';
import { useRef } from 'react';
import { NFTCard, ScrollButtons } from '../common';
import { ReactComponent as StarIcon } from '../common/images/icon-section-star.svg';

interface Props {
  nfts: NFT[];
}

export default function Featured({ nfts }: Props) {
  const { t } = useTranslation();
  const scrollRef = useRef(null);
  const [isLandingPageLoaded] = useAtom(isLandingPageLoadedAtom);

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  return (
    <div className="flex flex-col gap-[3.375rem] pt-12 xl:pt-[8.375rem] px-5 w-full max-w-[45rem] xl:max-w-[67rem] 2xl:max-w-[89rem] 3xl:max-w-[111rem] mx-auto lg:pb-[5.25rem]">
      <div className="flex items-center justify-center lg:py-4 md:justify-between">
        <div className="flex items-center gap-[1.125rem] lg:gap-6 2xl:gap-12">
          <StarIcon className="text-yellow" />
          <span className="font-bold text-white text-mobile-section xl:text-h3 2xl:text-section">
            {t('pages.landing.featuredNFTs')}
          </span>
          <StarIcon className="text-yellow" />
        </div>
        <ScrollButtons
          className="hidden md:flex"
          scroll={scroll}
          href="https://www.flowverse.co/flow-nfts"
          offset={704}
        />
      </div>
      <div
        className="grid grid-flow-col grid-rows-1 -mt-8 xl:mt-0 xl:grid-rows-2 gap-6 pb-6 xl:pb-[3.875rem] overflow-x-scroll scrollbar-mobile lg:scrollbar scroll-smooth"
        ref={scrollRef}
      >
        {nfts.map((item, index) => (
          <NFTCard
            key={item?.nft_id}
            chain={item?.chain}
            contract={item?.contract.name}
            creatorName={
              item.collection?.twitter_username ??
              item.collection?.name ??
              'Unknown'
            }
            creatorAvatar={
              item.collection?.image_url ?? item.previews?.image_small_url
            }
            token_id={item?.token_id}
            name={item?.name}
            image_url={
              index % 7 === 0
                ? item.previews?.image_large_url
                : item.previews?.image_medium_url
            }
            url={`/nft/${item.contract_address}/${item.token_id}`}
            big={index % 7 === 0 ? true : false}
            blurhash={item.previews?.blurhash}
            unoptimized={isLandingPageLoaded}
          />
        ))}
      </div>
      <ScrollButtons
        className="flex -mt-[1.875rem] pb-12 md:hidden"
        scroll={scroll}
        mobile
        href="https://www.flowverse.co/flow-nfts"
        offset={704}
      />
    </div>
  );
}
