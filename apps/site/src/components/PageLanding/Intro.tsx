import { isLandingPageLoadedAtom } from '@myflownfts/site/atoms';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/future/image';
import bgIntroMobileSm from './images/intro/bg-intro-mobile-sm.png';
import bgIntroMobileXs from './images/intro/bg-intro-mobile-xs.png';
import bgIntroMobile from './images/intro/bg-intro-mobile.png';
import bgIntro from './images/intro/bg-intro.png';
import { ReactComponent as ImageLogo } from './images/intro/logo-intro.svg';

export default function Intro() {
  const { t } = useTranslation();
  const [isLandingPageLoaded] = useAtom(isLandingPageLoadedAtom);

  return (
    <div
      className={classNames(
        'w-full h-[41rem] px-5 py-3 relative',
        'md:min-h-[60rem] md:pl-24',
        'lg:pl-40 lg:h-[51.5rem] lg:pr-[30rem] lg:pt-32',
        'xl:pl-[17rem] xl:pt-[10.75rem]'
      )}
    >
      <Image
        alt=""
        className="z-[-1] w-full object-cover xs:hidden"
        fill
        placeholder="blur"
        src={bgIntroMobile}
        unoptimized={isLandingPageLoaded}
      />
      <Image
        alt=""
        className="z-[-1] w-full object-cover hidden xs:block sm:hidden"
        fill
        placeholder="blur"
        src={bgIntroMobileXs}
        unoptimized={isLandingPageLoaded}
      />
      <Image
        alt=""
        className="z-[-1] w-full object-cover hidden sm:block lg:hidden"
        fill
        placeholder="blur"
        src={bgIntroMobileSm}
        unoptimized={isLandingPageLoaded}
      />
      <Image
        alt=""
        className="z-[-1] w-full object-cover hidden lg:block"
        fill
        placeholder="blur"
        quality="100"
        src={bgIntro}
        unoptimized={isLandingPageLoaded}
      />

      <ImageLogo className="scale-[.6] -translate-x-[2.75rem] lg:scale-100 lg:translate-x-0" />
      <div className="flex flex-wrap max-w-[46rem] lg:pt-[2.625rem] -mt-2.5 lg:mt-0">
        <span className="block font-bold text-white text-mobile-md md:text-md">
          {t('pages.landing.intro.title')}
        </span>
      </div>
      <div className="pt-6 md:pt-12 md:min-w-[440px] max-w-[46rem] h-[6.875rem] flex flex-col justify-between font-medium">
        <span className="block text-white md:text-title text-body font-body">
          {t('pages.landing.intro.subtitle1')}
        </span>
        <br />
        <span className="flex flex-wrap font-medium text-white md:text-title text-body font-body">
          {t('pages.landing.intro.subtitle2')}
        </span>
      </div>
    </div>
  );
}
