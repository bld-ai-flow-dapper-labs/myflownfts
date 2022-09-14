import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import { Button, TextInput } from '..';
import { ReactComponent as DrawerIcon } from '../images/icon-drawer.svg';
import { ReactComponent as ImageLogo } from '../images/icon-flow.svg';
import { ReactComponent as SearchIcon } from '../images/icon-search.svg';

interface Props {
  className?: string;
  search?: boolean;
}

export default function Navbar({ className, search = false }: Props) {
  const { t } = useTranslation();
  return (
    <div
      className={classNames(
        'absolute flex items-center justify-between gap-[3.75rem] w-full h-20 px-6 text-white lg:px-20 bg-navbar/30 lg:bg-transparent backdrop-blur-3xl lg:backdrop-blur-none',
        className
      )}
    >
      <a className="flex items-center flex-shrink-0" href="/">
        <ImageLogo />
        <span className="pl-3 font-bold text-h4">{t('common.title')}</span>
      </a>
      {search && (
        <TextInput
          containerClassName="hidden lg:grid h-[3.375rem] md:max-w-[40rem] lg:max-w-[50.875rem] flex-shrink w-full"
          className="placeholder:font-semibold md:placeholder:font-medium"
          placeholder={t('common.search')}
          searchBar
        />
      )}
      <Button
        href="/owned/0xb09c3e1b345f77ca"
        className="hidden h-[3.125rem] w-[13.125rem] lg:inline-flex flex-shrink-0 items-center justify-center px-5 py-3 text-button font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700"
      >
        {t('common.buttonConnectWallet')}
      </Button>
      <div className="flex gap-3 lg:hidden">
        <SearchIcon className="rounded-md bg-container-dark/[.15]" />
        <DrawerIcon className="rounded-md bg-container-dark/[.15]" />
      </div>
    </div>
  );
}
