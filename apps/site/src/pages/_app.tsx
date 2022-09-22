import useTranslation from 'next-translate/useTranslation';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { Provider } from 'jotai';
import * as fcl from '@onflow/fcl';

fcl.config({
  'accessNode.api': 'https://access-testnet.onflow.org',
  'discovery.wallet': 'https://fcl-discovery.onflow.org/authn',
});

function CustomApp({ Component, pageProps }: AppProps) {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('common.title')}</title>
      </Head>
      <main className="app">
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </main>
    </>
  );
}

export default CustomApp;
