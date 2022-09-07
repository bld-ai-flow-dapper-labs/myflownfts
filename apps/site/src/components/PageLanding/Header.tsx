import useTranslation from 'next-translate/useTranslation';
import TextInput from '../TextInput';
import Button from '../Button';

export default function Header() {
  const { t } = useTranslation();
  return (
    <div className="w-full h-screen bg-center bg-no-repeat bg-cover bg-header">
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 sm:flex sm:flex-col sm:items-center">
        <h1 className="flex flex-wrap justify-center w-[54.875rem] font-bold text-center text-white text-h1 sm:text-4xl">
          <span>{t('pages.landing.header.welcome')}</span>
          <div className="items-center justify-center flex ml-2 w-44 h-[4.125rem] bg-primary text-inverted">
            <span>{t('pages.landing.header.next')}</span>
          </div>
          <div className="flex items-center justify-center mr-2 w-[25.375rem] h-[4.125rem] bg-primary text-inverted">
            <span>{t('pages.landing.header.generation')} </span>
          </div>
          <span>{t('pages.landing.header.nfts')}</span>
        </h1>
        <TextInput
          containerClassName="h-16 m-10 w-[54.875rem] flex-shrink" //2xl:w-[54.875rem] w-[34.875rem]
          placeholder={t('common.search')}
          searchBar
        />
        <div className="flex mt-8 lg:flex-shrink-0">
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
