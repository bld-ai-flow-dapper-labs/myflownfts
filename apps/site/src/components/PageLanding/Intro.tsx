import useTranslation from 'next-translate/useTranslation';
import { ReactComponent as ImageLogo } from './images/logo-intro.svg';

export default function Intro() {
  const { t } = useTranslation();
  return (
    <div className="bg-intro bg-no-repeat bg-cover w-screen h-[824px] pl-[17rem] pt-[11.875rem]">
      <ImageLogo />
      <div className="w-[46rem] pt-[3.75rem]">
        <span className="block text-white text-h1">
          {t('pages.landing.intro.title')}
        </span>
      </div>
      <div className="pt-12 w-[46rem] h-[6.875rem] flex flex-col justify-between">
        <span className="block text-white text-subtitle">
          {t('pages.landing.intro.subtitle1')}
        </span>
        <br />
        <span className="text-white text-subtitle">
          {t('pages.landing.intro.subtitle2')}
        </span>
      </div>
    </div>
  );
}
