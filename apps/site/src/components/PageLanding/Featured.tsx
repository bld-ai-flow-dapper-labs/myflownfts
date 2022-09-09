import useTranslation from 'next-translate/useTranslation';
import { ReactComponent as StarIcon } from './images/icon-star-yellow.svg';
import NavButtons from '../NavButtons';
import nfts from './json/nfts.json';
import NFTCard from './NFTCard';
import { useRef } from 'react';

export default function Featured() {
  const { t } = useTranslation();
  const scrollRef = useRef(null);

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  return (
    <div className="flex flex-col gap-[3.375rem] pt-12 md:pt-[8.375rem] px-5 md:px-[16.75rem]">
      <div className="flex items-center justify-center md:py-4 md:justify-between">
        <div className="flex items-center gap-[1.125rem] md:gap-12">
          <StarIcon />
          <span className="font-bold text-white text-mobile-section md:text-section">
            {t('pages.landing.featuredNFTs')}
          </span>
          <StarIcon />
        </div>
        <NavButtons className="hidden md:flex" scroll={scroll} />
      </div>
      <div
        className="grid grid-flow-col grid-rows-1 -mt-8 md:mt-0 md:grid-rows-2 gap-6 pb-6 md:pb-[3.875rem] overflow-x-scroll scrollbar-mobile md:scrollbar scroll-smooth"
        ref={scrollRef}
      >
        {nfts.map((item, index) => (
          <NFTCard
            key={item?.token_id}
            chain={item?.chain}
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
            url={item.collection?.external_url}
            big={index % 7 === 0 ? true : false}
          />
        ))}
      </div>
      <NavButtons
        className="flex -mt-[1.875rem] mb-12 md:hidden"
        scroll={scroll}
        mobile
      />
    </div>
  );
}
