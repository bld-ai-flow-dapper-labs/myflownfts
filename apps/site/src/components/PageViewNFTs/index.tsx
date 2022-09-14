import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import gradient from 'random-gradient';
import { useEffect, useState } from 'react';
import { getNFTsByWallet, getRawQuery, getTotalNFTsByWallet } from '../../api';
import type { NFT } from '../../api/types';
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
  const [isLoading, setIsLoading] = useState(false);
  const [NFTs, setNFTs] = useState<NFT[]>();
  const [total, setTotal] = useState(0);
  const [profileNFT, setProfileNFT] = useState(0);
  const [increment, setIncrement] = useState(0);
  const [numNFTs, setNumNFTs] = useState(increment);
  const [nextPage, setNextPage] = useState<string>();
  const [page, setPage] = useState(0);

  const header = { background: gradient(address, 'diagonal') };
  const icon = { background: gradient(iconHash) };

  const loadInitial = () => {
    const { innerWidth: width } = window;
    if (width < 560) setIncrement(8);
    else if (width < 733) setIncrement(9);
    else if (width < 906) setIncrement(8);
    else if (width < 1024) setIncrement(10); //md breakpoint
    else if (width < 1193) setIncrement(8);
    else if (width < 1529) setIncrement(9);
    else if (width < 1900) setIncrement(8);
    else setIncrement(10);
  };

  useEffect(() => {
    (async () => {
      loadInitial();
      setIsLoading(true);
      const { next, data } = await getNFTsByWallet(address);
      setProfileNFT(Math.floor(Math.random() * data?.length));
      setNFTs(data);
      setNextPage(next);
      const total = await getTotalNFTsByWallet(address);
      setTotal(total);
      setIsLoading(false);
    })();
  }, [address]);

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
        navigator.clipboard.writeText(address);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1500);
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
        <Chip className="w-40 h-[2.375rem]" label="Copied!" variant="copied" />
      )}
    </Button>
  );

  const renderNFTs = () => {
    const cleanNFTs = NFTs?.filter(
      (item) =>
        item.name &&
        item.previews.image_small_url &&
        item.nft_id &&
        item.token_id
    );
    if (cleanNFTs?.length > 0) {
      return (
        <div className="grid justify-center w-full gap-2 py-12 lg:gap-6 grid-cols-fill-mobile lg:grid-cols-fill">
          {cleanNFTs
            .filter((_, index) => index < numNFTs)
            .map((item) => (
              <NFTCard
                key={item.nft_id}
                chain={item?.chain ?? 'flow'}
                creatorName={
                  item.collection?.twitter_username ??
                  item.collection?.name ??
                  'Unknown'
                }
                creatorAvatar={
                  item.collection?.image_url ?? item.previews?.image_small_url
                }
                token_id={item.token_id}
                name={item.name}
                image_url={item.previews?.image_small_url} // Error if no unknown
                url={item?.external_url ?? 'Unknown'}
                variant="view"
              />
            ))}
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center font-body pt-12 pb-[10.5rem] lg:pb-[14.875rem]">
        <span className="font-semibold text-white">
          {t('pages.viewNFTs.noItems')}
        </span>
        <span className="font-medium text-gray-100">
          {t('pages.viewNFTs.noOwned')}
        </span>
      </div>
    );
  };

  return (
    <div>
      <Navbar className="lg:!bg-navbar/90" search />
      <div className="h-[15.5rem] lg:h-[25rem]" style={header} />
      <div className="relative flex flex-col items-center justify-center w-full">
        <div
          className="absolute overflow-hidden rounded-full w-[8.75rem] h-[8.75rem] lg:w-[15rem] lg:h-[15rem] -top-[4.75rem] lg:-top-[11.875rem]"
          style={icon}
        >
          {!isLoading && NFTs && (
            <Image
              loader={() => NFTs[profileNFT].image_url}
              src={NFTs[profileNFT].image_url}
              alt={NFTs[profileNFT].name}
              placeholder="empty"
              layout="fill"
              objectFit="cover"
              unoptimized={true}
              className="transition duration-300 ease-in-out delay-150 group-hover:scale-105"
            />
          )}
        </div>
        <div className="flex flex-col items-center px-4 lg:px-24 w-full bg-gray-900 pb-12 lg:pb-[9.5rem] pt-[5.125rem] lg:pt-[4.625rem]">
          <div className="flex items-center gap-3 pb-12">
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
          {isLoading && <Loader className="mt-36" />}
          {!isLoading && renderNFTs()}
          {!isLoading && numNFTs < total && (
            <Button
              onClick={() => setNumNFTs(numNFTs + increment)}
              variant="scroll"
            >
              {t('pages.viewNFTs.loadMore')}
            </Button>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
