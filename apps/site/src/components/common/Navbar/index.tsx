import classNames from 'classnames';
import { useAtom } from 'jotai';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { Button, Footer, TextInput } from '..';
import { addressAtom, userAtom } from '../../../atoms';
import { useWallet } from '../../../utils';
import { ReactComponent as CloseIcon } from '../images/icon-close.svg';
import { ReactComponent as DrawerIcon } from '../images/icon-drawer.svg';
import { ReactComponent as ImageLogo } from '../images/icon-flow-nofill.svg';
import { ReactComponent as TextLogo } from '../images/icon-flow-text.svg';
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
  const textInputRef = useRef(null);

  const windowResize = () => {
    const { innerWidth: width } = window;
    if (width > 1024) {
      setShowSearch(false);
      setShowSidebar(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', windowResize);
    return () => window.removeEventListener('resize', windowResize);
  }, []);

  useEffect(() => {
    if (showSidebar) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'visible';
  }, [showSidebar]);

  const addressDisplay =
    address.length > 11
      ? `${address.slice(0, 4)}...${address.slice(-4)}`
      : address;

  const { t } = useTranslation();
  const router = useRouter();

  const { connectWallet } = useWallet();

  // Ensures animations are finished before re-rendering transitionClose based classes
  const transitionDelay = async (delay) => {
    const transition = await setTimeout(() => setTransitionClose(false), delay);
    return () => clearTimeout(transition);
  };
  // Set delays for transition before hiding components
  useEffect(() => {
    if ((showSidebar || (showSidebar && showSearch)) && transitionClose) {
      const sidebarTransition = setTimeout(() => setShowSidebar(false), 200);
      transitionDelay(200);
      return () => {
        clearTimeout(sidebarTransition);
      };
    } else if (showSearch && transitionClose) {
      const searchTransition = setTimeout(() => setShowSearch(false), 200);
      transitionDelay(200);
      return () => {
        clearTimeout(searchTransition);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transitionClose]);

  useEffect(() => {
    if (showSearch) textInputRef.current.focus();
  }, [showSearch]);

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

  const renderAddressButton = () => (
    <>
      {address && (
        <Button
          onClick={handleButtonClick}
          className="h-[3.125rem] w-full lg:max-w-[17.625rem] lg:min-w-[13rem] p-3 text-button font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 truncate"
        >
          {`${t('common.walletId')}: ${addressDisplay}`}
        </Button>
      )}
      <Button
        className={classNames(
          'h-[3.125rem] w-full lg:w-[17.625rem] lg:min-w-40',
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

  const renderSidebar = () => {
    Modal.setAppElement(document.getElementById('navbar'));

    return (
      <div className="flex items-center justify-center">
        <Modal
          isOpen={showSidebar}
          className="w-full h-full pt-3 text-white bg-navbar/30 backdrop-blur-xl overflow-clip backdrop-brightness-50"
          ariaHideApp={false}
          style={{ overlay: { backgroundColor: 0 } }}
        >
          <div className="flex flex-col gap-[3.75rem] px-6">
            <div className="flex items-center justify-between">
              <a href="/">
                <TextLogo className="w-[6.125rem] h-14" />
              </a>
              <div className="flex gap-3">
                <Button
                  variant="custom"
                  onClick={() => {
                    setShowSearch(true);
                    setTransitionClose(true);
                    textInputRef.current?.focus();
                  }}
                  className="rounded-md hover:bg-indigo-600"
                >
                  <SearchIcon className="rounded-md bg-container-dark/[.15]" />
                </Button>
                <Button
                  variant="custom"
                  className="rounded-md bg-container-dark/[.15] w-fit h-fit"
                  onClick={() => {
                    setTransitionClose(true);
                  }}
                >
                  <CloseIcon className="w-10 h-10 scale-50" />
                </Button>
              </div>
            </div>
            <div
              className={classNames(
                'flex flex-col gap-[3.75rem] -mt-2 text-sidebar-links font-semibold',
                transitionClose ? 'fadeOut' : 'fadeIn'
              )}
            >
              <div className={classNames('flex flex-col gap-6')}>
                {/* <a> forces refresh on click if already on homepage, <Button> does not */}
                <a
                  href="/"
                  className="transition duration-300 ease-in-out hover:text-gray-50 whitespace-nowrap"
                >
                  {t('common.home')}
                </a>
                <Button
                  href="#"
                  className="hover:text-gray-50"
                  variant="custom"
                >
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
              <div className="flex flex-col w-full gap-4 place-self-center">
                {renderAddressButton()}
              </div>
              <Footer sidebar />
            </div>
          </div>
        </Modal>
      </div>
    );
  };

  return (
    <>
      {showSidebar && renderSidebar()}
      <div
        id="navbar"
        className={classNames(
          'fixed lg:absolute flex items-center justify-between gap-8 xs:gap-[3.75rem] w-full h-20 px-6 text-white lg:px-20 bg-navbar/30 lg:bg-transparent backdrop-blur-3xl lg:backdrop-blur-none',
          !showSidebar && 'z-10',
          className
        )}
      >
        {!showSearch && (
          <>
            <a className="items-center flex-shrink-0 hidden lg:flex" href="/">
              <ImageLogo className="text-primary" />
              <span className="pl-3 font-bold text-h4">
                {t('common.title')}
              </span>
            </a>
            <a className="lg:hidden" href="/">
              <TextLogo className="w-[6.125rem] h-14" />
            </a>
          </>
        )}
        {search && (
          <form
            onSubmit={handleSubmit}
            className="hidden lg:grid h-[3.375rem] lg:max-w-[35rem]  w-full"
          >
            <TextInput
              className="text-tab placeholder:font-semibold md:placeholder:font-medium min-w-[10rem]"
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
        <div className="hidden lg:flex gap-2.5 lg:min-w-[25rem] lg:w-fit lg:justify-end">
          {renderAddressButton()}
        </div>
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
                  ref={textInputRef}
                  className="h-10 w-full max-w-[87.5vw] text-tab placeholder:font-semibold md:placeholder:font-medium"
                  placeholder={t('common.search')}
                  value={typed}
                  onChange={(e) => setTyped(e.target.value)}
                />
              </form>
              <Button
                variant="custom"
                className="rounded-md bg-container-dark/[.15] w-10 h-10"
                onClick={() => setTransitionClose(true)}
              >
                <CloseIcon className="w-10 h-10 scale-50" />
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="custom"
                onClick={() => {
                  setShowSearch(!showSearch);
                }}
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
