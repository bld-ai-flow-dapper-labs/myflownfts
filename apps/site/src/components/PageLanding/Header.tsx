import useTranslation from 'next-translate/useTranslation';

export default function Header() {
  const { t } = useTranslation();
  return (
    <div className="bg-header h-full w-screen bg-no-repeat bg-cover">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-80 lg:px-8 lg:flex lg:flex-col lg:items-center lg:justify-between">
        <h2 className="text-h1 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="text-white">{t('pages.landing.welcome')}</span>
          <span className="bg-primary text-inverted">
            {t('pages.landing.next')}
            <br /> {t('pages.landing.generation')}
          </span>
          <span className="text-white">{t('pages.landing.nfts')}</span>
        </h2>
        <input
          type="text"
          className="h-8 w-96 m-10 rounded-md placeholder:pl-2"
          placeholder={t('common.search')}
        />
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {t('common.buttonConnectWallet')}
            </a>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <a
              href="https://flow.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              {t('pages.landing.buttonLearnMore')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
