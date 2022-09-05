import useTranslation from 'next-translate/useTranslation';
import { ReactComponent as StarIcon } from './images/icon-star-yellow.svg';
import NavButtons from '../NavButtons';
import Image from 'next/image';
import placeholder from './images/featured-placeholder.png';

export default function Featured() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-[3.625rem] pt-[8.375rem]">
      <div className="flex justify-between px-20">
        <div className="flex items-center gap-12">
          <StarIcon />
          <span className="text-white text-h3">
            {t('pages.landing.featuredNFTs')}
          </span>
          <StarIcon />
        </div>
        <NavButtons />
      </div>
      <div className="px-16">
        <Image src={placeholder} width={1382} height={824} alt="placeholder" />
      </div>
    </div>
  );
}
