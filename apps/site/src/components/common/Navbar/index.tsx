import classNames from 'classnames';
import { useAtom } from 'jotai';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, TextInput } from '..';
import { addressAtom, userAtom } from '../../../atoms';
import { useWallet } from '../../../utils';
import { ReactComponent as DrawerIcon } from '../images/icon-drawer.svg';
import { ReactComponent as ImageLogo } from '../images/icon-flow.svg';
import { ReactComponent as SearchIcon } from '../images/icon-search.svg';

interface Props {
  className?: string;
  search?: boolean;
}

export default function Navbar({ className, search = false }: Props) {
  const [address] = useAtom(addressAtom);
  const [user] = useAtom(userAtom);
  const [typed, setTyped] = useState('');

  const { t } = useTranslation();
  const router = useRouter();

  const { connectWallet } = useWallet();

  useEffect(() => {
    if (address) {
      setTyped(address);
    }
  }, [address]);

  const handleButtonClick = () => {
    if (address) {
      router.push(`/owned/${address}`);
    } else {
      connectWallet();
    }
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (typed) {
      if (typed.match(/^0x[a-fA-F0-9]{16}$/g)) router.push(`/owned/${typed}`);
      // Assumes toast container is present in the calling component
      else toast(t('error.search'), { type: 'error' });
    }
  };

  return (
    <div
      className={classNames(
        'absolute flex items-center justify-between gap-[1.5rem] w-full h-20 px-6 text-white lg:px-20 bg-navbar/30 lg:bg-transparent backdrop-blur-3xl lg:backdrop-blur-none z-10',
        className
      )}
    >
      <a className="flex items-center flex-shrink-0" href="/">
        <ImageLogo />
        <span className="pl-3 font-bold text-h4">{t('common.title')}</span>
      </a>
      {search && (
        <form
          onSubmit={handleSubmit}
          className="hidden lg:grid h-[3.375rem] md:max-w-[40rem] lg:max-w-[50.875rem] w-full"
        >
          <TextInput
            className="placeholder:font-semibold md:placeholder:font-medium"
            placeholder={t('common.search')}
            endIcon={
              <Button
                className="text-white rounded-md bg-container-dark/[.15]"
                onClick={handleSubmit}
                variant="custom"
              >
                <SearchIcon className="inline" />
              </Button>
            }
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
          />
        </form>
      )}
      <div className="hidden lg:flex gap-2.5">
        {address && (
          <Button
            onClick={handleButtonClick}
            className="h-[3.125rem] min-w-[13.125rem] px-5 py-3 text-button font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 truncate"
          >
            {`${t('common.walletId')}: ${address}`}
          </Button>
        )}
        <Button
          className="h-[3.125rem] w-full md:w-[13.125rem]"
          onClick={connectWallet}
          variant={user.loggedIn ? 'light' : 'dark'}
        >
          {address
            ? t('common.buttonDisconnectWallet')
            : t('common.buttonConnectWallet')}
        </Button>
      </div>
      <div className="flex gap-3 lg:hidden">
        <SearchIcon className="rounded-md bg-container-dark/[.15]" />
        <DrawerIcon className="rounded-md bg-container-dark/[.15]" />
      </div>
    </div>
  );
}
