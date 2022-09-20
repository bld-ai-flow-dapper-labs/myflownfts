import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import { ReactComponent as ImageLogo } from './images/intro/logo-intro.svg';

export default function Intro() {
  const { t } = useTranslation();
  return (
    <div
      className={classNames(
        'bg-intro-mobile bg-no-repeat bg-cover w-full h-[41rem] px-5 py-3',
        'xs:bg-intro-mobile-xs',
        'sm:bg-intro-mobile-sm',
        'md:bg-intro bg-center md:bg-center md:pl-40 md:h-[51.5rem] md:pr-[30rem] md:pt-32',
        'xl:bg-center xl:pl-[17rem] xl:pt-[10.75rem]'
      )}
    >
      <ImageLogo className="scale-[.6] -translate-x-[2.75rem] md:scale-100 md:translate-x-0" />
      <div className="flex flex-wrap max-w-[46rem] md:pt-[2.625rem] -mt-2.5 md:mt-0">
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
