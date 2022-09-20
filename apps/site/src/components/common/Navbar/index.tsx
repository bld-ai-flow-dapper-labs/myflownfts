import useTranslation from 'next-translate/useTranslation';
import { ReactComponent as ImageLogo } from '../images/icon-flow.svg';
import { ReactComponent as SearchIcon } from '../images/icon-search.svg';
import { ReactComponent as DrawerIcon } from '../images/icon-drawer.svg';

export default function Navbar() {
  const { t } = useTranslation();
  return (
    <div className="absolute flex items-center justify-between w-full h-20 px-6 text-white lg:px-20 bg-navbar-mobile lg:bg-transparent backdrop-blur-3xl lg:backdrop-blur-none">
      <div className="flex items-center">
        <ImageLogo />
        <span className="pl-3 font-bold text-h4">{t('common.title')}</span>
      </div>
      <a
        href="#"
        className="hidden h-[3.125rem] w-[13.125rem] lg:inline-flex items-center justify-center px-5 py-3 text-button font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700"
      >
        {t('common.buttonConnectWallet')}
      </a>
      <div className="flex gap-3 lg:hidden">
        <SearchIcon className="rounded-md bg-container-dark" />
        <DrawerIcon className="rounded-md bg-container-dark" />
      </div>
    </div>
  );
}
