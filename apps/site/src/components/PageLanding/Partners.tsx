import useTranslation from 'next-translate/useTranslation';
import Image from 'next/future/image';
import { ReactComponent as StarIcon } from '../common/images/icon-section-star.svg';
import bgPartners from './images/partners/bg-partners.png';
import { ReactComponent as DrSeussIcon } from './images/partners/icon-drseuss.svg';
import { ReactComponent as NBAIcon } from './images/partners/icon-nba.svg';
import { ReactComponent as NFLIcon } from './images/partners/icon-nfl.svg';
import { ReactComponent as SamsungIcon } from './images/partners/icon-samsung.svg';
import { ReactComponent as TopshotIcon } from './images/partners/icon-topshot.svg';
import { ReactComponent as UbisoftIcon } from './images/partners/icon-ubisoft.svg';
import { ReactComponent as UFCIcon } from './images/partners/icon-ufc.svg';

import Marquee from 'react-fast-marquee';

export default function Partners() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center w-full h-[14.375rem] lg:h-[21.5rem] text-h3 pt-12 lg:pt-16 gap-6 relative">
      <Image
        alt=""
        className="z-[-2] w-full object-cover"
        fill
        src={bgPartners}
        unoptimized
      />
      <div className="flex items-center gap-12">
        <StarIcon className="text-primary" />
        <span className="font-bold text-white text-mobile-section lg:text-section">
          {t('pages.landing.partners')}
        </span>
        <StarIcon className="text-primary" />
      </div>
      <div className="w-full -mt-[1.5rem] overflow-hidden lg:mt-4">
        <Marquee direction="right" gradient={false} speed={50}>
          <div className="grid items-center grid-flow-col gap-0 pr-12 text-white lg:gap-44">
            <NBAIcon className="-ml-20 scale-50 lg:ml-20 lg:scale-100" />
            <DrSeussIcon className="scale-50 lg:scale-100" />
            <UFCIcon className="scale-50 lg:scale-100" />
            <SamsungIcon className="scale-50 lg:scale-100" />
            <UbisoftIcon className="scale-50 lg:scale-100" />
            <NFLIcon className="scale-50 lg:scale-100" />
            <TopshotIcon className="scale-50 lg:scale-100" />
            <NBAIcon className="-ml-20 scale-50 lg:ml-20 lg:scale-100" />
            <DrSeussIcon className="scale-50 lg:scale-100" />
            <UFCIcon className="scale-50 lg:scale-100" />
            <SamsungIcon className="scale-50 lg:scale-100" />
            <UbisoftIcon className="scale-50 lg:scale-100" />
            <NFLIcon className="scale-50 lg:scale-100" />
            <TopshotIcon className="scale-50 lg:scale-100" />
            <NBAIcon className="-ml-20 scale-50 lg:ml-20 lg:scale-100" />
            <DrSeussIcon className="scale-50 lg:scale-100" />
            <UFCIcon className="scale-50 lg:scale-100" />
            <SamsungIcon className="scale-50 lg:scale-100" />
            <UbisoftIcon className="scale-50 lg:scale-100" />
            <NFLIcon className="scale-50 lg:scale-100" />
            <TopshotIcon className="scale-50 lg:scale-100" />
          </div>
        </Marquee>
      </div>
    </div>
  );
}
