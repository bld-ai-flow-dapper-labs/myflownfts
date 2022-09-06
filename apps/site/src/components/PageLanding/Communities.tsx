import useTranslation from 'next-translate/useTranslation';
import { ReactComponent as StarIcon } from './images/icon-star-yellow.svg';
import NavButtons from '../NavButtons';
import placeholder from './images/communities-placeholder.png';
import Image from 'next/image';

export default function Communities() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-[3.375rem] pt-[8.375rem]">
      <div className="flex justify-between px-20 py-4">
        <div className="flex items-center gap-12">
          <StarIcon />
          <span className="font-bold text-white text-section">
            {t('pages.landing.ourCommunities')}
          </span>
          <StarIcon />
        </div>
        <NavButtons />
      </div>
      <div className="px-16">
        <Image src={placeholder} width={1382} height={476} alt="placeholder" />
      </div>
    </div>
  );
}
