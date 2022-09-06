import useTranslation from 'next-translate/useTranslation';
import { ReactComponent as StarIcon } from './images/icon-star-yellow.svg';
import NavButtons from '../NavButtons';
import nfts from './nfts.json';
import NFTCard from './NFTCard';

export default function Featured() {
  const { t } = useTranslation();
  console.log(nfts);
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
      <div className="flex gap-6 overflow-x-scroll">
        {nfts.map((item) => (
          <NFTCard
            key={item.token_id}
            chain={item.chain}
            creatorName={item.collection.name}
            creatorAvatar={item.collection.image_url}
            token_id={item.token_id}
            name={item.name}
            image_url={item.image_url}
            url={item.external_url}
          />
        ))}
      </div>
    </div>
  );
}
