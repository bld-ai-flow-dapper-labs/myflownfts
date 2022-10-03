import { Provider } from 'jotai';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { config } from '../utils/index';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const { t } = useTranslation();
  config();

  return (
    <>
      <NextSeo title={t('common.title')} />
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar
        pauseOnHover={false}
        theme="dark"
        bodyClassName="whitespace-pre-wrap"
      />
      <main className="app">
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </main>
    </>
  );
}

export default CustomApp;
