import useTranslation from 'next-translate/useTranslation';
import TextInput from '../TextInput';
import Button from '../Button';

export default function Header() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-end h-screen gap-[2.25rem] md:gap-16 px-5 pb-[7.25rem] md:pb-0 bg-center bg-no-repeat bg-cover md:justify-center bg-header-mobile md:bg-header">
      <h1 className="flex flex-wrap justify-center items-center lg:w-[54.875rem] font-bold text-white lg:text-h1 text-mobile-h1">
        <span>{t('pages.landing.header.welcome')}</span>
        <div className="items-center justify-center flex mx-2 lg:px-[0.625rem] pl-[0.625rem] pr-2 py-0.5 bg-primary text-inverted">
          <span>{t('pages.landing.header.next')}</span>
          <span className="inline ml-2 lg:hidden">
            {t('pages.landing.header.generation')}
          </span>
        </div>
        <div className="hidden lg:inline">
          <div className="flex items-center justify-center mr-2 lg:px-[0.625rem] pr-[0.625rem] py-0.5 bg-primary text-inverted">
            <span>{t('pages.landing.header.generation')} </span>
          </div>
        </div>
        <span>{t('pages.landing.header.nfts')}</span>
      </h1>
      <TextInput
        containerClassName="grid h-16 md:max-w-[54.875rem] flex-shrink w-full" //2xl:w-[54.875rem] w-[34.875rem]
        className="placeholder:font-semibold md:placeholder:font-medium"
        placeholder={t('common.search')}
        searchBar
      />
      <div className="flex flex-col justify-center w-full gap-3 md:flex-row lg:flex-shrink-0">
        <Button href="#" className="h-[3.125rem] w-full md:w-[13.125rem]">
          {t('common.buttonConnectWallet')}
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
