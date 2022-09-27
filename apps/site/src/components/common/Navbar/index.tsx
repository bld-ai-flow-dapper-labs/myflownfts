import classNames from 'classnames';
import { useAtom } from 'jotai';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Button, Footer, TextInput } from '..';
import { addressAtom, userAtom } from '../../../atoms';
import { useWallet } from '../../../utils';
import { ReactComponent as CloseIcon } from '../images/icon-close.svg';
import { ReactComponent as DrawerIcon } from '../images/icon-drawer.svg';
import { ReactComponent as TextLogo } from '../images/icon-flow-text.svg';
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
  const [showSearch, setShowSearch] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [transitionClose, setTransitionClose] = useState(false);

  const addressDisplay =
    address.length > 11
      ? `${address.slice(0, 4)}...${address.slice(-4)}`
      : address;

  const { t } = useTranslation();
  const router = useRouter();

  const { connectWallet } = useWallet();

  useEffect(() => {
    if (showSidebar) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'visible';
  }, [showSidebar]);

  // Set delays for transition before hiding components
  useEffect(() => {
    if (showSidebar) {
      setTimeout(() => setShowSidebar(false), 450);
      setTimeout(() => setTransitionClose(false), 500);
    } else if (showSearch) {
      setTimeout(() => setShowSearch(false), 450);
      setTimeout(() => setTransitionClose(false), 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transitionClose]);

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
      router.push(`/owned/${typed}`);
    }
  };

  const renderAddressButton = () => (
    <>
      {address && (
        <Button
          onClick={handleButtonClick}
          className="h-[3.125rem] w-full lg:max-w-[17.625rem] p-3 text-button font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 truncate"
        >
          {`${t('common.walletId')}: ${addressDisplay}`}
        </Button>
      )}
      <Button
        className={classNames(
          'h-[3.125rem] w-full lg:w-[17.625rem]',
          user.loggedIn ? 'lg:max-w-[17.625rem]' : 'lg:max-w-[13.125rem]'
        )}
        onClick={connectWallet}
        variant={user.loggedIn ? 'light' : 'dark'}
      >
        {address
          ? t('common.buttonDisconnectWallet')
          : t('common.buttonConnectWallet')}
      </Button>
    </>
  );

  const renderSidebar = () => (
    <div className="flex items-center justify-center">
      <Modal
        isOpen={showSidebar}
        className="w-full h-full text-white bg-gray-900 overflow-clip"
      >
        <div
          className={classNames(
            'flex flex-col gap-[3.75rem] px-6 pt-0.5',
            transitionClose ? 'fadeOut' : 'fadeIn'
          )}
        >
          <div className="flex items-center justify-between">
            <TextLogo className="h-14 w-fit" />
            <Button
              variant="custom"
              className="rounded-md bg-container-dark/[.15] w-fit h-fit"
              onClick={() => {
                setTransitionClose(!transitionClose);
              }}
            >
              <CloseIcon className="w-10 h-10 scale-50" />
            </Button>
          </div>
          <div className="flex flex-col gap-6">
            {/* <a> forces refresh on click if already on homepage, <Button> does not */}
            <a
              href="/"
              className="transition duration-300 ease-in-out hover:text-gray-50 whitespace-nowrap"
            >
              {t('common.home')}
            </a>
            <Button href="#" className="hover:text-gray-50" variant="custom">
              {t('pages.landing.footer.terms')}
            </Button>
            <Button
              href="#"
              className="hover:text-gray-50 whitespace-nowrap"
              variant="custom"
            >
              {t('pages.landing.footer.contactUs')}
            </Button>
          </div>
          <div className="flex flex-col gap-4 place-self-center">
            {renderAddressButton()}
          </div>
          <Footer
            sidebar
            className="absolute bottom-0 -translate-x-1/2 left-1/2"
          />
        </div>
      </Modal>
    </div>
  );

  return (
    <>
      {showSidebar && renderSidebar()}
      <div
        className={classNames(
          'absolute flex items-center justify-between gap-8 xs:gap-[3.75rem] w-full h-20 px-6 text-white lg:px-20 bg-navbar/30 lg:bg-transparent backdrop-blur-3xl lg:backdrop-blur-none',
          className
        )}
      >
        {!showSearch && (
          <a className="flex items-center flex-shrink-0" href="/">
            <ImageLogo />
            <span className="pl-3 font-bold text-h4">{t('common.title')}</span>
          </a>
        )}
        {search && (
          <form
            onSubmit={handleSubmit}
            className="hidden lg:grid h-[3.375rem] md:max-w-[40rem] lg:max-w-[50.875rem] w-full"
          >
            <TextInput
              className="placeholder:font-semibold md:placeholder:font-medium min:w-[160px]"
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
        <div className="hidden lg:flex gap-2.5">{renderAddressButton()}</div>
        <div
          className={classNames(
            'flex items-center gap-3 lg:hidden',
            showSearch && 'w-full'
          )}
        >
          {showSearch ? (
            <div
              className={classNames(
                'flex items-center justify-between w-full gap-3 h-fit',
                transitionClose ? 'fadeOut' : 'fadeIn'
              )}
            >
              <form onSubmit={handleSubmit} className="w-full py-4">
                <TextInput
                  className="h-10 w-full max-w-[87.5vw] placeholder:font-semibold md:placeholder:font-medium"
                  placeholder={t('common.search')}
                  value={typed}
                  onChange={(e) => setTyped(e.target.value)}
                />
              </form>
              <Button
                variant="custom"
                className="rounded-md bg-container-dark/[.15] w-10 h-10"
                onClick={() => setTransitionClose(!transitionClose)}
              >
                <CloseIcon className="w-10 h-10 scale-50" />
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="custom"
                onClick={() => setShowSearch(!showSearch)}
              >
                <SearchIcon className="rounded-md bg-container-dark/[.15]" />
              </Button>

              <Button
                variant="custom"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <DrawerIcon className="rounded-md bg-container-dark/[.15]" />
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
