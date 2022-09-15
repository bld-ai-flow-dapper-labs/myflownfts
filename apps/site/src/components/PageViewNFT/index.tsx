import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getExchangeRates, getNFTByTokenId } from '../../api';
import type { ExchangeRates, NFT } from '../../api/types';
import { ReactComponent as EthIcon } from '../../components/common/images/icon-eth.svg';
import { ReactComponent as FlowIcon } from '../../components/common/images/icon-flow-nofill.svg';
import { ReactComponent as LinkIcon } from '../../components/common/images/icon-link.svg';
import { ReactComponent as RefreshIcon } from '../../components/common/images/icon-refresh.svg';
import { ReactComponent as ShareIcon } from '../../components/common/images/icon-share.svg';
import { ReactComponent as USDIcon } from '../../components/common/images/icon-usd.svg';

import { Button, Chip, Navbar } from '../common';

export default function PageViewNFT() {
  const router = useRouter();
  const contract_address = router.query.contract_address as string;
  const token_id = router.query.token_id as string;
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<NFT>();
  const [currency, setCurrency] = useState<'flow' | 'usd' | 'ethereum'>('flow');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>();

  useEffect(() => {
    (async () => {
      const data = await getNFTByTokenId(
        contract_address,
        token_id,
        contract_address.slice(0, 2) === 'A.' ? 'flow' : 'ethereum'
      );
      setExchangeRates(await getExchangeRates());
      setToken(data);
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderNFT = () => (
    <div className={classNames('rounded-md overflow-hidden w-4/5 h-full')}>
      {token.video_url ? (
        <video
          autoPlay
          loop
          className="h-full border-4 w-9/10 border-container-dark/10"
        >
          <source src={token.video_url} />
        </video>
      ) : (
        <div className="relative w-full h-full border-4 border-container-dark/10">
          <Image
            loader={() => token.image_url}
            src={token.image_url}
            alt={token.name}
            placeholder="empty"
            layout="fill"
            objectFit="cover"
            unoptimized={true}
          />
        </div>
      )}
    </div>
  );

  // Assumes last_sale is FLOW price
  // const priceConversion = () => {
  //   if (!token.last_sale) return 'Unavailable';
  //   switch (currency) {
  //     case 'flow':
  //       return token.last_sale.unit_price.toFixed(2);
  //     case 'ethereum':
  //       return (token.last_sale.unit_price * exchangeRates.eth).toFixed(3);
  //     case 'usd':
  //       return (token.last_sale.unit_price * exchangeRates.usd).toFixed(2);
  //   }
  // };

  // For testing: /0x8943c7bac1914c9a7aba750bf2b6b09fd21037e0/5903
  // ETH Initial price
  const priceConversion = () => {
    if (!token.last_sale?.unit_price || !exchangeRates) return 'Unavailable';
    const ethPrice = token.last_sale.unit_price / 10 ** 18;
    const flowPrice = ethPrice / exchangeRates?.eth;
    const usdPrice = flowPrice * exchangeRates?.usd;
    switch (currency) {
      case 'flow':
        return flowPrice.toFixed(2);
      case 'ethereum':
        return ethPrice.toFixed(3);
      case 'usd':
        return usdPrice.toFixed(2);
    }
  };

  return (
    <div className="relative h-screen bg-navbar">
      <Navbar />

      {!isLoading && token?.nft_id && (
        <div className="flex w-full h-full gap-[10.375rem] pt-28">
          <div className="flex items-start justify-end w-1/2 mt-12 h-5/6">
            {renderNFT()}
          </div>
          <div className="flex justify-end w-1/2">
            <div className="flex flex-col h-fit w-full items-end pr-[16.875rem]">
              <div className="flex items-center gap-3 pb-4">
                <Button
                  className="flex items-center justify-center w-8 h-8 px-0"
                  variant="scroll"
                  onClick={() => router.replace(router.asPath)}
                >
                  <RefreshIcon />
                </Button>
                <Button
                  className="flex items-center justify-center w-8 h-8 px-0"
                  variant="scroll"
                >
                  <ShareIcon />
                </Button>
                <Button
                  className="flex items-center justify-center w-8 h-8 px-0 pt-1.5 text-center"
                  variant="scroll"
                >
                  <span className="text-white">...</span>
                </Button>
              </div>
              <div className="flex flex-col min-w-[20rem] w-full gap-6 p-6 border-4 rounded-md border-container-dark/10 h-fit">
                <div className="flex gap-3">
                  <Image
                    className="rounded-full"
                    loader={() =>
                      token.collection?.image_url ??
                      token.previews?.image_small_url
                    }
                    src={
                      token.collection?.image_url ??
                      token.previews?.image_small_url
                    }
                    width={40}
                    height={40}
                    alt={token.name}
                    placeholder="empty"
                    unoptimized={true}
                  />
                  <div
                    className={classNames('flex flex-col w-fit max-w-[8rem]')}
                  >
                    <span className="block font-semibold font-body text-container-text text-body opacity-30">
                      {t('pages.landing.createdBy')}
                    </span>
                    <span className="block font-semibold truncate opacity-75 font-body text-container-text text-body">
                      {token.collection?.twitter_username ??
                        token.collection?.name ??
                        'Unknown'}
                    </span>
                  </div>
                </div>
                <span className="font-semibold text-white text-h3">
                  {token.name}
                </span>
                <span className="font-medium text-white text-footer font-body">
                  {token.description ?? t('pages.viewNFT.noDescription')}
                </span>
                <div className="flex flex-col text-body font-semibold text-white bg-container-dark/5 rounded-md py-[1.375rem] px-4 gap-8">
                  <div className="flex items-center justify-between pb-1.5 border-b-2 border-container-dark/5">
                    <span>{t('pages.viewNFT.currency')}</span>
                    <div className="flex self-end gap-1 text-white">
                      <Button
                        className="w-8 h-8 px-0"
                        variant="currency"
                        disabled={currency === 'flow'}
                        onClick={() => setCurrency('flow')}
                      >
                        <FlowIcon className="scale-50" />
                      </Button>
                      <Button
                        className="w-8 h-8 px-0"
                        variant="currency"
                        disabled={currency === 'usd'}
                        onClick={() => {
                          // Conservative, assumes flow token is the default currency
                          // if (!exchangeRates && token.last_sale.unit_price) {
                          //   setExchangeRates(await getExchangeRates());
                          // }
                          setCurrency('usd');
                        }}
                      >
                        <USDIcon />
                      </Button>
                      <Button
                        className="w-8 h-8 px-0"
                        variant="currency"
                        disabled={currency === 'ethereum'}
                        onClick={() => {
                          // if (!exchangeRates && token.last_sale.unit_price) {
                          //   setExchangeRates(await getExchangeRates());
                          // }
                          setCurrency('ethereum');
                        }}
                      >
                        <EthIcon className="scale-75" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex -mt-[1.125rem] items-center justify-between">
                    <span>{t('pages.viewNFT.lastSale')}</span>
                    <Chip
                      className="h-[1.875rem] w-fit justify-between"
                      label={priceConversion().toString()}
                      chain={currency}
                      variant="price"
                    />
                  </div>
                </div>
                <Button className="gap-2" href={token?.external_url}>
                  <span>{t('pages.viewNFT.buyOnMarketplace')}</span>
                  <LinkIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isLoading && !token?.nft_id && (
        <span className="absolute font-bold text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-h1">
          {t('pages.viewNFT.notFound')}
        </span>
      )}
    </div>
  );
}
