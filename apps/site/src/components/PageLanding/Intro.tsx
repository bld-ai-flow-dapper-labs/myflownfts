import useTranslation from 'next-translate/useTranslation';
import { ReactComponent as ImageLogo } from './images/logo-intro.svg';

export default function Intro() {
  const { t } = useTranslation();
  return (
    <div className="bg-intro bg-no-repeat bg-cover w-full h-[824px] pl-[17rem] pt-[10.75rem]">
      <ImageLogo />
      <div className="w-[46rem] pt-[2.625rem]">
        <span className="block font-bold text-white text-md">
          {t('pages.landing.intro.title')}
        </span>
      </div>
      <div className="pt-12 w-[46rem] h-[6.875rem] flex flex-col justify-between font-medium">
        <span className="block text-white text-title font-body">
          {t('pages.landing.intro.subtitle1')}
        </span>
        <br />
        <span className="font-medium text-white text-title font-body">
          {t('pages.landing.intro.subtitle2')}
        </span>
      </div>
    </div>
  );
}
