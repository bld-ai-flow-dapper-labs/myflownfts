import { ExchangeRates, NFT } from '@myflownfts/data-access';
import { ReactComponent as EthIcon } from '@myflownfts/site/components/common/images/icon-eth.svg';
import { ReactComponent as FlowIcon } from '@myflownfts/site/components/common/images/icon-flow-nofill.svg';
import { ReactComponent as LinkIcon } from '@myflownfts/site/components/common/images/icon-link.svg';
import { ReactComponent as USDIcon } from '@myflownfts/site/components/common/images/icon-usd.svg';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/future/image';
import { useState } from 'react';
import { Button, Chip } from '../common';

interface Props {
  token: NFT;
  isPageLoaded: boolean;
  exchangeRates: ExchangeRates;
}

const Details = ({ token, isPageLoaded, exchangeRates }: Props) => {
  const [currency, setCurrency] = useState<'flow' | 'usd' | 'ethereum'>('flow');
  const { t } = useTranslation();

  const cleanString = (string) => {
    if (typeof string === 'string' && !string.toLowerCase().startsWith('http'))
      return string
        .replace(/_/g, ' ')
        .replace(/-/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/([0-9])([A-Z])/g, '$1 $2')
        .replace(/([a-z])([0-9])/g, '$1 $2')
        .replace(/^./, (str) => str.toUpperCase());
    return string;
  };

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
  const getPriceConversion = () => {
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

  const renderTokenPrice = () => (
    <>
      {token.last_sale && (
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
              label={getPriceConversion().toString()}
              chain={currency}
              variant="price"
            />
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="flex flex-col min-w-80 w-full max-w-[50rem] gap-6 p-6 lg:border-2 rounded-md lg:border-container-dark/10 h-fit">
      <div className="flex gap-3">
        <Image
          className="rounded-full"
          loader={() =>
            token.collection?.image_url ??
            token.previews?.image_small_url ??
            'Unsupported'
          }
          src={
            token.collection?.image_url ??
            token.previews?.image_small_url ??
            'Unsupported'
          }
          width={40}
          height={40}
          alt={token?.name}
          placeholder={'empty'}
          unoptimized={isPageLoaded}
        />
        <div className="flex flex-col w-fit max-w-32">
          <span className="block font-semibold font-body text-container-text text-body opacity-30">
            {t('pages.landing.createdBy')}
          </span>
          <span className="block font-semibold truncate opacity-75 font-body text-container-text text-body">
            {cleanString(token?.collection.twitter_username) ??
              cleanString(token?.collection.name) ??
              'Unknown'}
          </span>
        </div>
      </div>
      <span className="font-semibold text-white text-h3">
        {token?.name && token?.name !== token?.contract.name
          ? token.name
          : token.contract.name + ' #' + token.token_id}
      </span>
      <span className="font-medium text-white whitespace-pre-line text-footer font-body">
        {token.description ?? t('pages.viewNFT.noDescription')}
      </span>
      {renderTokenPrice()}
      <Button className="gap-2" href={token?.external_url}>
        <span>{t('pages.viewNFT.buyOnMarketplace')}</span>
        <LinkIcon />
      </Button>
    </div>
  );
};

export default Details;
