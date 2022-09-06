import useTranslation from 'next-translate/useTranslation';
import { ReactComponent as PartnersBanner } from './images/banner-partners.svg';
import { ReactComponent as StarIcon } from './images/icon-star-green.svg';

export default function Partners() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col no-scrollbar items-center w-screen h-[21.5rem] overflow-x-scroll bg-no-repeat bg-auto bg-partners text-h3 pt-16 gap-6">
      <div className="flex items-center gap-12">
        <StarIcon />
        <span className="font-bold text-white text-section">
          {t('pages.landing.partners')}
        </span>
        <StarIcon />
      </div>
      <PartnersBanner />
    </div>
  );
}
