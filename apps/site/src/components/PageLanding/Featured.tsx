import useTranslation from 'next-translate/useTranslation';
import { ReactComponent as StarIcon } from './images/icon-star-yellow.svg';
import NavButtons from '../NavButtons';
import nfts from './json/nfts.json';
import NFTCard from './NFTCard';

export default function Featured() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-[3.625rem] pt-[8.375rem] px-[16.75rem]">
      <div className="flex justify-between">
        <div className="flex items-center gap-12">
          <StarIcon />
          <span className="font-bold text-white text-section">
            {t('pages.landing.featuredNFTs')}
          </span>
          <StarIcon />
        </div>
        <NavButtons />
      </div>
      <div className="grid grid-flow-col grid-rows-2 gap-6 pb-12 overflow-x-scroll scrollbar">
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
    </div>
  );
}
