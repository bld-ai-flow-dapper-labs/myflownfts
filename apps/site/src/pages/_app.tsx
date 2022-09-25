import * as fcl from '@onflow/fcl';
import { Provider } from 'jotai';
import useTranslation from 'next-translate/useTranslation';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

fcl.config({
  'accessNode.api': 'https://access-testnet.onflow.org',
  'app.detail.title': 'My Flow NFTs',
  'discovery.wallet': 'https://flow-wallet.blocto.app/authn',
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
