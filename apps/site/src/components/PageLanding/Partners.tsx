import useTranslation from 'next-translate/useTranslation';
import { ReactComponent as NBAIcon } from './images/partners/icon-nba.svg';
import { ReactComponent as DrSeussIcon } from './images/partners/icon-drseuss.svg';
import { ReactComponent as UFCIcon } from './images/partners/icon-ufc.svg';
import { ReactComponent as SamsungIcon } from './images/partners/icon-samsung.svg';
import { ReactComponent as UbisoftIcon } from './images/partners/icon-ubisoft.svg';
import { ReactComponent as NFLIcon } from './images/partners/icon-nfl.svg';
import { ReactComponent as TopshotIcon } from './images/partners/icon-topshot.svg';
import { ReactComponent as StarIcon } from './images/partners/icon-star-green.svg';

export default function Partners() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center w-full h-[14.375rem] lg:h-[21.5rem] bg-no-repeat bg-cover bg-partners-mobile lg:bg-partners bg-bottom text-h3 pt-12 lg:pt-16 gap-6">
      <div className="flex items-center gap-12">
        <StarIcon />
        <span className="font-bold text-white text-mobile-section lg:text-section">
          {t('pages.landing.partners')}
        </span>
        <StarIcon />
      </div>
      <div className="w-full -mt-[1.75rem] overflow-hidden lg:mt-4">
        <div className="grid items-center grid-flow-col pr-12 lg:gap-44 scroll-ticker-sm lg:scroll-ticker-lg">
          {/*  overflow-x-scroll gap-44 no-scrollbar if no animation */}
          <NBAIcon className="scale-50 lg:scale-100" />
          <DrSeussIcon className="scale-50 lg:scale-100" />
          <UFCIcon className="scale-50 lg:scale-100" />
          <SamsungIcon className="scale-50 lg:scale-100" />
          <UbisoftIcon className="mx-10 scale-50 lg:scale-100 lg:mx-0" />
          <NFLIcon className="mx-10 scale-50 lg:scale-100 lg:mx-0" />
          <TopshotIcon className="scale-50 lg:scale-100" />
          <NBAIcon className="scale-50 lg:scale-100" />
          <DrSeussIcon className="scale-50 lg:scale-100" />
          <UFCIcon className="scale-50 lg:scale-100" />
          <SamsungIcon className="scale-50 lg:scale-100" />
          <UbisoftIcon className="mx-10 scale-50 lg:scale-100 lg:mx-0" />
          <NFLIcon className="mx-10 scale-50 lg:scale-100 lg:mx-0" />
          <TopshotIcon className="scale-50 lg:scale-100" />
        </div>
      </div>
    </div>
  );
}
