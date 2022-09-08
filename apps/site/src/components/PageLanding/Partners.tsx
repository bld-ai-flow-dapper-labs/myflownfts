import useTranslation from 'next-translate/useTranslation';
import { ReactComponent as NBAIcon } from './images/partners/icon-nba.svg';
import { ReactComponent as DrSeussIcon } from './images/partners/icon-drseuss.svg';
import { ReactComponent as UFCIcon } from './images/partners/icon-ufc.svg';
import { ReactComponent as SamsungIcon } from './images/partners/icon-samsung.svg';
import { ReactComponent as UbisoftIcon } from './images/partners/icon-ubisoft.svg';
import { ReactComponent as NFLIcon } from './images/partners/icon-nfl.svg';
import { ReactComponent as TopshotIcon } from './images/partners/icon-topshot.svg';
import { ReactComponent as StarIcon } from './images/icon-star-green.svg';

export default function Partners() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center w-full h-[21.5rem] bg-no-repeat bg-cover bg-partners text-h3 pt-16 gap-6">
      <div className="flex items-center gap-12">
        <StarIcon />
        <span className="font-bold text-white text-section">
          {t('pages.landing.partners')}
        </span>
        <StarIcon />
      </div>
      <div className="w-full pt-4 overflow-hidden">
        <div className="grid items-center grid-flow-col pr-12 gap-44 scroll-ticker">
          {/*  overflow-x-scroll gap-44 no-scrollbar if no animation */}
          <NBAIcon />
          <DrSeussIcon />
          <UFCIcon />
          <SamsungIcon />
          <UbisoftIcon />
          <NFLIcon />
          <TopshotIcon />
          <NBAIcon />
          <DrSeussIcon />
          <UFCIcon />
          <SamsungIcon />
          <UbisoftIcon />
          <NFLIcon />
          <TopshotIcon />
        </div>
      </div>
    </div>
  );
}
