import useTranslation from 'next-translate/useTranslation';
import { ReactComponent as ImageLogo } from './images/logo.svg';

export default function Navbar() {
  const { t } = useTranslation();
  return (
    <div className="absolute flex items-center justify-between w-full h-20 px-20">
      <div className="flex items-center">
        <ImageLogo />
        <span className="pl-3 font-bold text-white text-h4">
          {t('common.title')}
        </span>
      </div>
      <a
        href="#"
        className="h-[3.125rem] w-[13.125rem] inline-flex items-center justify-center px-5 py-3 text-button font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
      >
        {t('common.buttonConnectWallet')}
      </a>
    </div>
  );
}
