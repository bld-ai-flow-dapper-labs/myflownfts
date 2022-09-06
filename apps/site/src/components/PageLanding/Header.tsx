import useTranslation from 'next-translate/useTranslation';

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
        <input
          type="text"
          className="h-8 m-10 rounded-md w-96 placeholder:pl-2"
          placeholder={t('common.search')}
        />
        <div className="flex mt-8 lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="h-[3.125rem] w-[13.125rem] inline-flex items-center justify-center px-5 py-3 text-button font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {t('common.buttonConnectWallet')}
            </a>
          </div>
          <div className="inline-flex ml-3 rounded-md shadow">
            <a
              href="https://flow.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center w-[13.125rem] justify-center px-5 py-3 font-semibold text-indigo-600 bg-white rounded-lg text-button hover:bg-indigo-50"
            >
              {t('pages.landing.buttonLearnMore')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
