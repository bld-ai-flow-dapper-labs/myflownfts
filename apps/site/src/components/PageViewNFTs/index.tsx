import { BASE_URL, FindProfile, NFT } from '@myflownfts/data-access';
import { getNFTsByWallet, getRawQuery } from '@myflownfts/site/api';
import { getProfile } from '@myflownfts/site/utils';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import gradient from 'random-gradient';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Chip, Footer, Loader, Navbar, NFTCard } from '../common';

export default function PageViewNFTs() {
  const router = useRouter();
  const address = router.query.address as string;
  const addressDisplay =
    address.length > 11
      ? `${address.slice(0, 6)}...${address.slice(-4)}`
      : address;
  const iconHash = address.length > 11 ? address.slice(2) : address;
  const { t } = useTranslation();

  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [NFTs, setNFTs] = useState<NFT[]>();
  const [total, setTotal] = useState(0);
  const [profileNFT, setProfileNFT] = useState<string>();
  const [increment, setIncrement] = useState(0);
  const [numNFTs, setNumNFTs] = useState(increment);
  const [nextPage, setNextPage] = useState<string>();
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [findProfile, setFindProfile] = useState<FindProfile>();

  const header = { background: gradient(address, 'diagonal') };
  const icon = { background: gradient(iconHash, 'vertical') };

  const loadInitial = () => {
    const { innerWidth: width } = window;
    if (width < 560) setIncrement(8);
    else if (width < 733) setIncrement(9);
    else if (width < 906) setIncrement(8);
    else if (width < 1024) setIncrement(10);
    //md breakpoint
    else if (width < 1193) setIncrement(8);
    else if (width < 1529) setIncrement(9);
    else if (width < 1900) setIncrement(8);
    else setIncrement(10);
  };

  const getFindProfile = async () => {
    // Ensure address is a flow address to prevent errors when passed to cadence contracts
    if (address.match(/^0x[a-fA-F0-9]{16}$/g)) {
      const profile = await getProfile(address);
      if (profile) setFindProfile(profile);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        // Reload on url change to force update on browser back and forward buttons
        router.events.on('routeChangeComplete', () => router.reload());
        loadInitial();
        getFindProfile();
        const { next, count, data } = await getNFTsByWallet(address);
        if (!data) throw 'Error in fetching NFTs';
        const cleanNFTs = data?.filter(
          (item) => item.name && item.previews.image_small_url
        );
        const profileNFT =
          cleanNFTs[Math.floor(Math.random() * cleanNFTs?.length)]?.token_id;
        setProfileNFT(profileNFT);
        setNFTs(data);
        setNextPage(next);
        setTotal(count);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setError(true);
      }
      return () => {
        router.events.off('routeChangeComplete', () => router.reload());
      };
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (numNFTs === 0) setNumNFTs(increment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [increment]);

  useEffect(() => {
    (async () => {
      if (numNFTs > 50 * page - increment) {
        const { next, data } = await getRawQuery(nextPage);
        setNFTs([...NFTs, ...data]);
        setPage(page + 1);
        setNextPage(next);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numNFTs]);

  const renderAddressChip = () => (
    <Button
      onClick={() => {
        try {
          navigator.clipboard.writeText(address);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 1500);
        } catch (e) {
          console.error(e);
          toast(t('error.pages.viewNFT.copy'), { type: 'error' });
        }
      }}
      variant="custom"
    >
      {!isCopied ? (
        <Chip
          className="w-40 h-[2.375rem]"
          label={addressDisplay}
          chain="flow"
          variant="secondary"
        />
      ) : (
        <Chip
          className="w-40 h-[2.375rem] text-lightBlue bg-lightBlue/20"
          label={t('pages.viewNFTs.buttonCopied')}
          variant="copied"
        />
      )}
    </Button>
  );

  const renderFindChip = () => {
    const link = findProfile.findName
      ? `https://find.xyz/${findProfile.findName}`
      : `https://find.xyz/${address}`;
    const label =
      findProfile.findName !== ''
        ? findProfile.findName.concat('.find')
        : findProfile.name;

    return (
      <Button
        href={link}
        rel="noopener noreferrer"
        target="_blank"
        variant="custom"
      >
        <Chip
          className="w-40 h-[2.375rem]"
          label={label}
          chain="flow"
          variant="find"
        />
      </Button>
    );
  };

  const renderNFTs = () => {
    if (NFTs?.length > 0) {
      return (
        <div className="grid justify-center w-full gap-2 py-12 lg:gap-6 grid-cols-fill-mobile lg:grid-cols-fill">
          {NFTs.filter((_, index) => index < numNFTs).map((item) => (
            <NFTCard
              key={item.nft_id}
              chain={item.chain ?? 'flow'}
              contract={item.contract.name}
              creatorName={
                item.collection.twitter_username ??
                item.collection.name ??
                '/not_supported.png'
              }
              token_id={item.token_id}
              name={
                item?.name && item?.name !== item?.contract.name
                  ? item.name
                  : item.contract.name + ' #' + item.token_id
              }
              image_url={item.previews.image_small_url ?? '/not_supported.png'} // Error if no unknown
              url={`/nft/${item.contract_address}/${item.token_id}`}
              variant="view"
            />
          ))}
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center py-24 pt-12 font-body">
        <span className="font-semibold text-white">
          {t('pages.viewNFTs.noItems')}
        </span>
        <span className="font-medium text-gray-100">
          {t('pages.viewNFTs.noOwned')}
        </span>
      </div>
    );
  };

  const renderProfilePhoto = () => {
    let photoUrl;
    let alt;
    if (findProfile) {
      photoUrl = findProfile.avatar;
      alt = findProfile.name;
    } else {
      const profilePhoto = NFTs.filter((nft) => nft.token_id === profileNFT)[0];
      photoUrl =
        profilePhoto.previews.image_small_url ?? profilePhoto.image_url;
      alt = profilePhoto.name;
    }
    return (
      <Image
        loader={() => photoUrl}
        src={photoUrl}
        alt={alt}
        placeholder="empty"
        layout="fill"
        objectFit="cover"
        unoptimized={true}
        className="transition duration-300 ease-in-out delay-150 group-hover:scale-105"
        priority
      />
    );
  };

  return (
    <>
      <NextSeo
        title={t('pages.viewNFTs.meta.title')}
        openGraph={{
          description: t('pages.viewNFTs.meta.description', { address }),
          type: 'text/html; charset=UTF-8',
          images: [
            {
              url: `${BASE_URL}/og-image.png`,
            },
          ],
        }}
        twitter={{ site: 'MyFlowNFTs', cardType: 'summary_large_image' }}
        additionalMetaTags={[
          { name: 'theme-color', content: '#202124' },
          {
            name: 'twitter:title',
            content: t('pages.viewNFTs.meta.title'),
          },
          {
            name: 'twitter:description',
            content: t('pages.viewNFTs.meta.description', { address }),
          },
          {
            name: 'twitter:image',
            content: `${BASE_URL}/twitter-image.png`,
          },
        ]}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar
        pauseOnHover={false}
        theme="dark"
        bodyClassName="whitespace-pre-wrap"
      />
      <div className="h-full min-h-screen bg-gray-900">
        <Navbar className="!bg-navbar lg:!bg-navbar/90" search />
        <div className="h-[15.5rem] lg:h-[25rem]" style={header} />
        <div className="relative flex flex-col items-center w-full">
          <div
            className="absolute overflow-hidden rounded-full w-[8.75rem] h-[8.75rem] lg:w-[15rem] lg:h-[15rem] -top-[4.75rem] lg:-top-[11.875rem]"
            style={icon}
          >
            {!isLoading &&
              (findProfile?.avatar || (NFTs?.length > 0 && profileNFT)) &&
              renderProfilePhoto()}
          </div>
          <div className="flex flex-col min-h-[calc(100vh-32.25rem)] h-full items-center px-4 lg:px-24 w-full pt-[5.125rem] lg:pt-[4.625rem]">
            <div className="flex items-center gap-3 pb-12">
              {findProfile && renderFindChip()}
              {renderAddressChip()}
            </div>
            <div className="flex justify-center w-full border-b-[1px] border-container-dark/10">
              <div className="flex items-center gap-2 pb-3 border-b-4 border-indigo-600 w-fit">
                <span className="font-semibold text-white text-tab">
                  {t('pages.viewNFTs.owned')}
                </span>
                <span className="flex items-center justify-center h-5 px-1 font-medium text-indigo-500 rounded-md bg-indigo-600/10 font-body text-count">
                  {total}
                </span>
              </div>
            </div>
            {!error && isLoading && <Loader className="my-36" />}
            {!isLoading && renderNFTs()}
            {!isLoading && numNFTs < total && (
              <Button
                onClick={() => setNumNFTs(numNFTs + increment)}
                variant="scroll"
                className="mb-12 lg:mb-[9.5rem]"
              >
                {t('pages.viewNFTs.loadMore')}
              </Button>
            )}
            {error && (
              <span className="w-full font-body font-semibold pt-12 pb-[10.5rem] lg:pb-[14.875rem] text-center text-white break-normal whitespace-pre-line lg:pt-24 text-body lg:text-h2">
                {t('error.pages.viewNFTs.loading')}
              </span>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
