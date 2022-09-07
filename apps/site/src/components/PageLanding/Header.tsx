import useTranslation from 'next-translate/useTranslation';
import TextInput from '../TextInput';
import Button from '../Button';

export default function Header() {
  const { t } = useTranslation();
  return (
    <div className="w-screen h-full bg-no-repeat bg-cover bg-header">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-80 lg:px-8 lg:flex lg:flex-col lg:items-center lg:justify-between">
        <h1 className="font-bold text-center text-white text-h1 sm:text-4xl">
          <span>{t('pages.landing.header.welcome')}</span>
          <span className="h-2 bg-primary text-inverted">
            {t('pages.landing.header.next')}
            <br /> {t('pages.landing.header.generation')}
          </span>
          <span>{t('pages.landing.header.nfts')}</span>
        </h1>
        <TextInput
          containerClassName="h-16 m-10 w-[54.875rem]"
          placeholder={t('common.search')}
          searchBar
        />
        <div className="flex mt-8 lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Button href="#" className="h-[3.125rem] w-[13.125rem]">
              {t('common.buttonConnectWallet')}
            </Button>
          </div>
          <div className="inline-flex ml-3 rounded-md shadow">
            <Button
              href="https://flow.com/"
              target="_blank"
              rel="noreferrer"
              className="h-[3.125rem] w-[13.125rem]"
              variant="light"
            >
              {t('pages.landing.buttonLearnMore')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
