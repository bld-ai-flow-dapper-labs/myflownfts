import { BASE_URL, ExchangeRates, NFT } from '@myflownfts/data-access';
import {
  getExchangeRates,
  getNFTByTokenId,
  postRefreshMetadata,
} from '@myflownfts/site/api';
import { ReactComponent as CloseIcon } from '@myflownfts/site/components/common/images/icon-close.svg';
import { ReactComponent as EthIcon } from '@myflownfts/site/components/common/images/icon-eth.svg';
import { ReactComponent as FlowIcon } from '@myflownfts/site/components/common/images/icon-flow-nofill.svg';
import { ReactComponent as LinkIcon } from '@myflownfts/site/components/common/images/icon-link.svg';
import { ReactComponent as RefreshIcon } from '@myflownfts/site/components/common/images/icon-refresh.svg';
import { ReactComponent as ShareIcon } from '@myflownfts/site/components/common/images/icon-share.svg';
import { ReactComponent as USDIcon } from '@myflownfts/site/components/common/images/icon-usd.svg';
import * as Popover from '@radix-ui/react-popover';
import classNames from 'classnames';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import ImageGallery from 'react-image-gallery';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';

import { Button, Chip, Footer, Loader, Navbar } from '../common';

interface ExtraMetadataProps {
  url?: string;
  type?: string;
}

type ExtraMetadataType = ExtraMetadataProps | string;

interface Props {
  SSRToken: NFT;
}

export default function PageViewNFT({ SSRToken }: Props) {
  const router = useRouter();
  const contract_address = router.query.contract_address as string;
  const token_id = router.query.token_id as string;
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<NFT>();
  const [currency, setCurrency] = useState<'flow' | 'usd' | 'ethereum'>('flow');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>();
  const galleryRef = useRef(null);
  const divRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [images, setImages] = useState([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const renderVideo = (item) => {
    return (
      <div id="video-wrapper" className="relative w-full h-full rounded-lg">
        <video
          autoPlay
          controls
          loop
          muted
          controlsList="nodownload nofullscreen noremoteplayback"
          className="mx-auto"
        >
          <source src={item.embedUrl} />
        </video>
      </div>
    );
  };

  const renderVideoCloseButton = () => {
    const id = 'video-close-button';
    const component = (
      <Button
        className="absolute text-white left-5 top-5"
        variant="custom"
        onClick={() => galleryRef.current.toggleFullScreen()}
      >
        <CloseIcon className="scale-150" />
      </Button>
    );

    if (!document.getElementById(id)) {
      const divs = document.getElementById('video-wrapper');
      if (divs) {
        const d = document.createElement('div');
        d.id = id;
        divs.appendChild(d);
        const rootElement = document.getElementById(id);
        const root = ReactDOM.createRoot(rootElement);
        root.render(component);
      }
    }
  };

  useEffect(() => {
    (async () => {
      let data;
      if (SSRToken) {
        data = SSRToken;
      } else {
        data = await getNFTByTokenId(
          contract_address,
          token_id,
          contract_address.slice(0, 2) === 'A.' ? 'flow' : 'ethereum'
        );
      }
      const gallery = [];
      if (data?.video_url) {
        gallery.push({
          embedUrl: data?.video_url,
          thumbnail: data?.previews.image_small_url,
          thumbnailClass:
            'border-1 border-container-dark/0 rounded-lg overflow-hidden',
          renderItem: renderVideo.bind(this),
        });
      }
      if (data?.image_url) {
        gallery.push({
          original: data.previews?.image_large_url ?? data.image_url,
          originalClass:
            'border-1 border-container-dark/0 rounded-lg overflow-hidden',
          fullscreen: data.previews?.image_large_url ?? data.image_url,
          thumbnail: data.previews?.image_small_url ?? data.image_url,
          thumbnailClass:
            'border-1 border-container-dark/0 rounded-lg overflow-hidden',
        });
      }
      // Renders other images included, unstable due to varying sizes of images distorting the viewer
      if (data?.extra_metadata?.media?.length > 0)
        gallery.push(
          ...data.extra_metadata.media
            .filter((item: ExtraMetadataType) => {
              if (typeof item === 'string') {
                if (!item.startsWith('ipfs'))
                  return item.slice(-4) === '.png' || item.slice(-4) === '.jpg';
              }
              if (typeof item === 'object')
                try {
                  if (!item.url.startsWith('ipfs')) {
                    return (
                      item.url.slice(-4) === '.png' ||
                      item.url.slice(-4) === '.jpg'
                    );
                  }
                } catch (e) {
                  console.error(e);
                }
            })
            .map((image: ExtraMetadataType) => {
              if (typeof image === 'string') {
                return {
                  original: image,
                  thumbnail: image,
                  thumbnailClass:
                    'border-1 border-container-dark/0 rounded-lg overflow-hidden',
                };
              }
              if (typeof image === 'object')
                try {
                  if (!image.url.startsWith('ipfs')) {
                    return {
                      original: image.url,
                      thumbnail: image.url,
                      thumbnailClass:
                        'border-1 border-container-dark/0 rounded-lg overflow-hidden',
                    };
                  }
                } catch (e) {
                  console.error(e);
                }
            })
        );
      setImages(gallery);
      setExchangeRates(await getExchangeRates());
      setToken(data);
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Modify classes within react-image-gallery to change dimensions on runtime
  useEffect(() => {
    if (isFullscreen) {
      document.getElementsByTagName('video')[0]?.classList.add('h-screen');
      const imageElements = document.getElementsByClassName(
        'image-gallery-image'
      );
      Array.from(imageElements).forEach((item) =>
        item.classList.add('h-screen')
      );
      renderVideoCloseButton();
    } else {
      document.getElementsByTagName('video')[0]?.classList.remove('h-screen');
      const imageElements = document.getElementsByClassName(
        'image-gallery-image'
      );
      Array.from(imageElements).forEach((item) =>
        item.classList.remove('h-screen')
      );
      document.getElementById('video-close-button')?.remove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFullscreen]);

  const renderNFT = () => (
    <div
      className={classNames(
        'relative rounded-md w-full lg:w-4/5 lg:max-w-[62.5rem] border-4 border-container-dark/0 bg-container-dark/10',
        isFullscreen && 'z-20'
      )}
      ref={divRef}
    >
      <ImageGallery
        ref={galleryRef}
        items={images}
        autoplay
        showThumbnails={images.length > 1}
        showThumbnailsOnNormalViewOnly={images.length > 1}
        showIndexOnFullscreenOnly={images.length > 1}
        showNav={isFullscreen}
        showPlayButton={false}
        showFullscreenButton={false}
        showZoomButtons
        showVideo
        stopPropagation
        onClick={() => {
          if (!isFullscreen) galleryRef.current.toggleFullScreen();
        }}
        onScreenChange={() => {
          setIsFullscreen(!isFullscreen);
        }}
        onSlide={() => document.getElementsByTagName('video')[0]?.pause()}
      />
    </div>
  );

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

  const renderNFTDetails = () => (
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
          placeholder="empty"
          unoptimized={true}
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

  const renderPropertyCard = (item) => {
    const propertyValue = () => {
      if (typeof item.value === 'string') return cleanString(item.value);
      if (typeof item.value === 'object') {
        try {
          return cleanString(item.value.name);
        } catch (e) {
          console.error(e);
        }
      }
      return 'N/A';
    };

    return (
      <div
        key={item.trait_type}
        className={classNames(
          'rounded-lg min-h-[4.5rem] lg:min-h-[5.5rem] p-px',
          (item.rarity?.description === 'rare' ||
            item.rarity?.description === 'uncommon') &&
            'bg-indigo-600',
          item.rarity?.description === 'epic' &&
            'bg-gradient-to-r from-epic-start to-epic-end',
          item.rarity?.description === 'legendary' &&
            'bg-gradient-to-r from-legendary-start to-legendary-end'
        )}
      >
        <div className="relative flex flex-col h-full gap-2 p-4 rounded-lg bg-property/95">
          <span className="font-semibold text-container-text/50 text-caption">
            {cleanString(item.trait_type)}
          </span>
          <span
            className={classNames(
              'font-semibold text-footer font-body whitespace-pre-line',
              propertyValue()?.toLowerCase().startsWith('https')
                ? 'break-all'
                : 'break-word'
            )}
          >
            {propertyValue()}
          </span>
          {item.rarity && (
            <div className="-mt-1">
              <br className="hidden lg:block" />
              <span
                className={classNames(
                  'absolute font-medium text-container-text/50 top-4 right-4 lg:top-auto lg:right-auto lg:bottom-4 text-rarity bg-clip-text font-body brightness-[0.6]',
                  (item.rarity?.description === 'rare' ||
                    item.rarity?.description === 'uncommon') &&
                    'bg-indigo-600',
                  item.rarity?.description === 'epic' &&
                    'bg-gradient-to-r from-[#4BC1FA] to-[#7CFF97]',
                  item.rarity?.description === 'legendary' &&
                    'bg-gradient-to-r from-[#F5C6FB] to-[#FFF030]'
                )}
              >
                {item.rarity.description.replace(/^./, (str) =>
                  str.toUpperCase()
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderNFTProperties = () => (
    <div className="flex flex-col min-w-80 w-full max-w-[50rem] gap-6 p-6 rounded-xl bg-container-dark/5 h-fit text-white">
      <span className="font-semibold text-title">
        {t('pages.viewNFT.properties')}
      </span>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {token.extra_metadata.attributes
          .filter(
            (property) =>
              !property.trait_type.toLowerCase().includes('date') &&
              !property.trait_type.toLowerCase().includes('id') &&
              !property.trait_type.toLowerCase().includes('edition') &&
              !property.trait_type.toLowerCase().includes('serial') &&
              !property.trait_type.toLowerCase().includes('series')
          )
          .map((item) => renderPropertyCard(item))}
      </div>
    </div>
  );

  const renderSocialsPopover = () => (
    <Popover.Root open={isPopoverOpen}>
      <Popover.Anchor>
        <Button
          className="flex items-center justify-center w-8 h-8 px-0"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          variant="scroll"
          data-tip={t('pages.viewNFT.popover.share')}
          data-for="share"
          data-event-off="click"
        >
          <ShareIcon />
          <ReactTooltip
            id="share"
            place="top"
            effect="solid"
            className="rounded-lg font-body !bg-black"
            arrowColor="#000"
            disable={isPopoverOpen}
          />
        </Button>
      </Popover.Anchor>
      <Popover.Portal>
        <Popover.Content
          className="slideDownAndFade"
          onInteractOutside={() => setIsPopoverOpen(false)}
        >
          <div className="flex flex-col items-start gap-1 p-1 mt-2 text-white rounded-lg font-body bg-scroll-button">
            <Button
              className="!justify-start w-full hover:scale-105 !pl-3 !py-1 gap-2 overflow-hidden"
              variant="scroll"
              onClick={() => {
                try {
                  navigator.clipboard.writeText(location.href);
                  toast(t('pages.viewNFT.copied'), { type: 'success' });
                } catch (e) {
                  console.error(e);
                  toast(t('error.pages.viewNFT.copy'), { type: 'error' });
                } finally {
                  setIsPopoverOpen(false);
                }
              }}
            >
              <FlowIcon className="scale-[.65] bg-white rounded-full text-primary" />
              <span>{t('pages.viewNFT.share.copy')}</span>
            </Button>
            <FacebookShareButton
              url={`${BASE_URL}/nft/${contract_address}/${token_id}`}
              className="inline-flex items-center justify-start w-full gap-4 px-5 py-3 font-semibold text-white transition duration-300 ease-in-out rounded-lg text-button hover:scale-105 bg-scroll-button hover:bg-scroll-hover"
              resetButtonStyle={false}
              onClick={() => setIsPopoverOpen(false)}
            >
              <FacebookIcon size={32} round />
              <span>{t('pages.viewNFT.share.facebook')}</span>
            </FacebookShareButton>
            <TwitterShareButton
              url={`${BASE_URL}/nft/${contract_address}/${token_id}`}
              className="inline-flex items-center justify-start w-full gap-4 px-5 py-3 font-semibold text-white transition duration-300 ease-in-out rounded-lg text-button hover:scale-105 bg-scroll-button hover:bg-scroll-hover"
              title={t('pages.viewNFT.share.caption')}
              resetButtonStyle={false}
              onClick={() => setIsPopoverOpen(false)}
            >
              <TwitterIcon size={32} round />
              <span>{t('pages.viewNFT.share.twitter')}</span>
            </TwitterShareButton>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );

  // Uncomment when reporting is implemented
  // const renderReportPopover = () => (
  //   <Popover.Root onOpenChange={() => setIsPopoverOpen(!isPopoverOpen)}>
  //     <Popover.Anchor>
  //       <Popover.Trigger asChild>
  //         <Button
  //           className="flex items-center justify-center w-8 h-8 px-0 pt-1.5 text-center"
  //           variant="scroll"
  //           data-tip={t('pages.viewNFT.popover.more')}
  //           data-for="more"
  //           data-event-off="click"
  //         >
  //           <span className="text-white">...</span>
  //           <ReactTooltip
  //             id="more"
  //             place="top"
  //             effect="solid"
  //             className="rounded-lg font-body !bg-black"
  //             arrowColor="#000"
  //             disable={isPopoverOpen}
  //           />
  //         </Button>
  //       </Popover.Trigger>
  //     </Popover.Anchor>
  //     <Popover.Portal>
  //       <Popover.Content className="slideDownAndFade">
  //         <div className="flex flex-col items-start gap-1 p-1 mt-2 text-white rounded-lg font-body bg-scroll-button">
  //           <Button
  //             className="!justify-start w-full hover:scale-105"
  //             variant="scroll"
  //             onClick={() =>
  //               toast(t('pages.viewNFT.reported'), { type: 'info' })
  //             }
  //           >
  //             <span>{t('pages.viewNFT.report')}</span>
  //           </Button>
  //         </div>
  //       </Popover.Content>
  //     </Popover.Portal>
  //   </Popover.Root>
  // );

  const renderButtons = () => (
    <div className="flex items-center gap-3 pb-4">
      <Button
        className="flex items-center justify-center w-8 h-8 px-0"
        variant="scroll"
        onClick={() => refreshMetadata()}
        data-tip={t('pages.viewNFT.popover.refresh')}
        data-for="refresh"
        data-event-off="click"
      >
        <RefreshIcon />
        <ReactTooltip
          id="refresh"
          place="top"
          effect="solid"
          className="rounded-lg font-body !bg-black"
          arrowColor="#000"
          disable={isPopoverOpen}
        />
      </Button>
      {renderSocialsPopover()}
      {/* {renderReportPopover()} */}
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

  const refreshMetadata = async () => {
    const { message } = await postRefreshMetadata(
      contract_address.slice(0, 2) === 'A.' ? 'flow' : 'ethereum',
      contract_address,
      token_id
    );
    if (message.includes('triggered'))
      toast(t('pages.viewNFT.refresh.triggered'), { type: 'success' });
    else if (message.includes('already in refresh queue'))
      toast(t('pages.viewNFT.refresh.queued'), { type: 'info' });
    else
      toast(t('error.pages.viewNFT.refresh'), {
        type: 'error',
      });
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
    <>
      {SSRToken && (
        <NextSeo
          description={SSRToken.description ?? t('pages.viewNFT.noDescription')}
          title={t('pages.viewNFT.meta.title', {
            nftName:
              SSRToken?.nft_id && SSRToken?.image_url
                ? SSRToken.name ??
                  SSRToken.contract.name + ' #' + SSRToken.token_id
                : t('error.error'),
          })}
          openGraph={{
            description:
              SSRToken.description ?? t('pages.viewNFT.noDescription'),
            type: 'text/html; charset=UTF-8',
            images: [
              {
                url:
                  SSRToken.previews.image_medium_url ??
                  SSRToken.image_url ??
                  t('error.pages.viewNFT.notFound'),
              },
            ],
          }}
          twitter={{ site: 'MyFlowNFTs', cardType: 'summary_large_image' }}
          additionalMetaTags={[
            { name: 'theme-color', content: '#202124' },
            {
              property: 'twitter:creator',
              content: `${
                cleanString(SSRToken?.collection.twitter_username) ??
                cleanString(SSRToken?.collection.name)
              }`,
            },
            {
              property: 'twitter:title',
              content: `${
                SSRToken?.nft_id && SSRToken?.image_url
                  ? SSRToken.name ??
                    SSRToken.contract.name + ' #' + SSRToken.token_id
                  : t('error.error')
              }`,
            },
            {
              property: 'twitter:description',
              content: `${
                SSRToken.description ?? t('pages.viewNFT.noDescription')
              }`,
            },
            {
              property: 'twitter:image',
              content: `${
                SSRToken.previews.image_medium_url ??
                SSRToken.image_url ??
                t('error.pages.viewNFT.notFound')
              }`,
            },
            { property: 'Content-Type', content: 'text/html; charset=UTF-8' },
          ]}
        />
      )}
      <div className="relative flex flex-col w-full h-full min-h-screen bg-navbar">
        <Navbar search />
        {isLoading && (
          <div className="relative mt-[4.375rem] lg:mt-20 lg:-mb-20 h-[calc(100vh-4.125rem)] lg:h-[calc(100vh-10rem)]">
            <div className="absolute z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <Loader />
            </div>
          </div>
        )}

        {!isLoading && !token?.image_url && (
          <div className="relative lg:mt-20 lg:-mb-20 h-[calc(100vh-4.125rem)] lg:h-[calc(100vh-10rem)]">
            <span className="absolute w-full font-bold text-center text-white whitespace-pre-wrap -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-h3 sm:text-h1">
              {token?.nft_id
                ? t('error.pages.viewNFT.unsupported')
                : t('error.pages.viewNFT.notFound')}
            </span>
          </div>
        )}

        {!isLoading && token?.nft_id && token?.image_url && (
          <div className="flex flex-col items-end h-fit pt-28 place-self-center min-h-[calc(100vh-11.5rem)] w-11/12 max-w-[125rem] lg:pr-24">
            {renderButtons()}
            <div className="flex flex-col lg:flex-row w-full h-full gap-6 lg:gap-[10.375rem]">
              <div className="flex justify-center w-full pt-2 mx-auto lg:pt-0 lg:w-1/2 lg:items-start lg:justify-end lg:pb-16 h-5/6">
                {renderNFT()}
              </div>
              <div className="flex flex-col items-center w-full gap-6 mx-auto lg:items-end lg:w-1/2">
                {renderNFTDetails()}
                {token.extra_metadata.attributes && renderNFTProperties()}
              </div>
            </div>
          </div>
        )}

        <Footer
          className={classNames(
            'mt-12',
            (isLoading ||
              (token?.nft_id && !token?.name && !token?.image_url) ||
              !token?.nft_id) &&
              'lg:absolute lg:bottom-0'
          )}
        />
      </div>
    </>
  );
}
