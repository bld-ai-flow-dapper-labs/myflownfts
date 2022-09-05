import useTranslation from 'next-translate/useTranslation';
import { ReactComponent as ImageLogo } from './images/logo.svg';

export default function Navbar() {
  const { t } = useTranslation();
  return (
    <div className="absolute px-20 h-20 w-screen flex justify-between items-center">
      <div className="flex items-center">
        <ImageLogo />
        <span className="text-white pl-3">{t('common.title')}</span>
      </div>
      <a
        href="#"
        className="h-[3.125rem] inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        {t('common.buttonConnectWallet')}
      </a>
    </div>
  );
}
