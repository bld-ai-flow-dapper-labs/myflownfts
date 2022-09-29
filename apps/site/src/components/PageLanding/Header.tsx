import classNames from 'classnames';
import { useAtom } from 'jotai';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { addressAtom, isLandingPageLoadedAtom, userAtom } from '../../atoms';
import { useWallet } from '../../utils';
import { Button, TextInput } from '../common';
import { ReactComponent as SearchIcon } from '../common/images/icon-search.svg';
import bgHeaderMobileSm from './images/header/bg-header-mobile-sm.png';
import bgHeaderMobileXs from './images/header/bg-header-mobile-xs.png';
import bgHeaderMobile from './images/header/bg-header-mobile.png';
import bgHeader from './images/header/bg-header.png';

export default function Header() {
  const { t } = useTranslation();
  const [user] = useAtom(userAtom);
  const [address] = useAtom(addressAtom);
  const [isLandingPageLoaded] = useAtom(isLandingPageLoadedAtom);
  const [typed, setTyped] = useState('');

  const router = useRouter();
  const { connectWallet } = useWallet();

  useEffect(() => {
    if (address) {
      setTyped(address);
    }
  }, [address]);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (typed) {
      if (typed.match(/^0x[a-fA-F0-9]{16}$/g)) router.push(`/owned/${typed}`);
      else toast(t('error.search'), { type: 'error' });
    }
  };

  return (
    <div
      className={classNames(
        'flex flex-col items-center justify-center relative',
        'h-screen gap-[2.25rem] px-5 pt-[23rem] pb-[7.25rem]',
        'sm:justify-bottom',
        'md:pb-24',
        'lg:gap-16 lg:justify-center lg:pb-[19rem]'
      )}
    >
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar
        pauseOnHover={false}
        theme="dark"
        bodyClassName="whitespace-pre-wrap"
      />
      <Image
        alt=""
        className="z-[-2] w-full object-cover xs:hidden"
        fill
        placeholder="blur"
        src={bgHeaderMobile}
        unoptimized={isLandingPageLoaded}
      />
      <Image
        alt=""
        className="z-[-2] w-full object-cover hidden xs:block sm:hidden"
        fill
        placeholder="blur"
        src={bgHeaderMobileXs}
        unoptimized={isLandingPageLoaded}
      />
      <Image
        alt=""
        className="z-[-2] w-full object-cover hidden sm:block lg:hidden"
        fill
        placeholder="blur"
        src={bgHeaderMobileSm}
        unoptimized={isLandingPageLoaded}
      />
      <Image
        alt=""
        className="z-[-2] w-full object-cover hidden lg:block"
        fill
        placeholder="blur"
        quality="100"
        src={bgHeader}
        unoptimized={isLandingPageLoaded}
      />
      <h1
        className={classNames(
          'flex flex-wrap justify-center items-center font-bold text-white text-mobile-h1',
          'xs:w-[25rem] sm:w-[30rem] md:w-[54.875rem] md:text-h2 lg:text-h1'
        )}
      >
        <span>{t('pages.landing.header.welcome')}</span>
        <div className="items-center justify-center flex mx-2 sm:px-[0.625rem] pl-[0.625rem] pr-2 py-0.5 bg-primary text-inverted">
          <span>{t('pages.landing.header.next')}</span>
          <span className="ml-2 sm:hidden">
            {t('pages.landing.header.generation')}
          </span>
        </div>
        <div className="hidden sm:inline">
          <div className="flex items-center justify-center mr-2 sm:px-[0.625rem] pr-[0.625rem] py-0.5 bg-primary text-inverted">
            <span>{t('pages.landing.header.generation')} </span>
          </div>
        </div>
        <span>{t('pages.landing.header.nfts')}</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid h-16 md:max-w-[40rem] lg:max-w-[50.875rem] flex-shrink w-full"
      >
        <TextInput
          className="placeholder:font-semibold md:placeholder:font-medium"
          endIcon={
            <Button
              className="text-white rounded-md bg-container-dark/[.15]"
              onClick={handleSubmit}
              variant="custom"
            >
              <SearchIcon className="inline" />
            </Button>
          }
          placeholder={t('common.search')}
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
        />
      </form>
      <div className="flex flex-col justify-center w-full gap-3 md:flex-row lg:flex-shrink-0">
        <Button
          onClick={connectWallet}
          className="h-[3.125rem] w-full md:w-[13.125rem]"
        >
          {user?.loggedIn
            ? t('common.buttonDisconnectWallet')
            : t('common.buttonConnectWallet')}
        </Button>
        <Button
          href="https://flow.com/"
          target="_blank"
          rel="noreferrer"
          className="h-[3.125rem] w-full md:w-[13.125rem]"
          variant="light"
        >
          {t('pages.landing.buttonLearnMore')}
        </Button>
      </div>
    </div>
  );
}
