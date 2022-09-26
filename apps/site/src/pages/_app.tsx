import * as fcl from '@onflow/fcl';
import { Provider } from 'jotai';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import { AppProps } from 'next/app';
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
      <NextSeo title={t('common.title')} />
      <main className="app">
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </main>
    </>
  );
}

export default CustomApp;
