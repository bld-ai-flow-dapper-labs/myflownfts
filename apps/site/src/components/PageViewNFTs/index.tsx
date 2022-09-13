import { useState } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { Button, Chip, NFTCard } from '../common';
import nfts from '../PageLanding/json/nfts.json';
import gradient from 'random-gradient';

import { Navbar, Footer } from '../common';
export default function PageViewNFTs() {
  const router = useRouter();
  const address = router.query.address;
  const wallet = '0x0f653af8cea6e890';
  const walletDisplay = `${wallet.slice(0, 5)}...${wallet.slice(-7, -1)}`;
  const iconHash = wallet.slice(2, -1);
  const { t } = useTranslation();

  const [numNFTs, setNumNFTs] = useState(10);
  const [isCopied, setIsCopied] = useState(false);

  const header = { background: gradient(wallet, 'diagonal') };
  const icon = { background: gradient(iconHash) };

  const renderAddressChip = () => (
    <Button
      onClick={() => {
        navigator.clipboard.writeText(wallet);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1500);
      }}
      variant="custom"
    >
      {!isCopied ? (
        <Chip
          className="w-40 h-[2.375rem]"
          label={walletDisplay}
          chain="flow"
          variant="secondary"
        />
      ) : (
        <Chip className="w-40 h-[2.375rem]" label="Copied!" variant="copied" />
      )}
    </Button>
  );

  const renderNFTs = () => {
    if (nfts.length > 0) {
      return (
        <div className="grid justify-center w-full gap-2 py-12 lg:gap-6 grid-cols-fill-mobile lg:grid-cols-fill">
          {nfts
            .filter((_, index) => index < numNFTs)
            .map((item) => (
              <NFTCard
                key={item?.token_id}
                chain={item?.chain}
                creatorName={
                  item.collection?.twitter_username ??
                  item.collection?.name ??
                  'Unknown'
                }
                creatorAvatar={
                  item.collection?.image_url ?? item.previews?.image_small_url
                }
                token_id={item?.token_id}
                name={item?.name}
                image_url={item.previews?.image_medium_url}
                url={item.collection?.external_url}
                variant="view"
              />
            ))}
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center font-body pt-12 pb-[14.875rem]">
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
          className="absolute rounded-full w-[8.75rem] h-[8.75rem] lg:w-[15rem] lg:h-[15rem] -top-[4.75rem] lg:-top-[11.875rem]"
          style={icon}
        />
        <div className="flex flex-col items-center px-4 lg:px-24 w-full bg-gray-900 pb-12 lg:pb-[9.5rem] pt-[5.125rem] lg:pt-[4.625rem]">
          <div className="flex items-center gap-3 pb-12">
            {renderAddressChip()}
            <Button
              className="flex items-center justify-center w-8 h-8 px-0 pt-1.5 text-center"
              variant="scroll"
            >
              <span className="text-white">...</span>
            </Button>
          </div>
          <div className="flex justify-center w-full border-b-[1px] border-container-dark/10">
            <div className="flex items-center gap-2 pb-3 border-b-4 border-indigo-600 w-fit">
              <span className="font-semibold text-white text-tab">
                {t('pages.viewNFTs.owned')}
              </span>
              <span className="flex justify-center items-center h-5 font-medium text-indigo-500 w-[1.75rem] bg-indigo-600/10 font-body text-count rounded-md">
                {nfts.length}
              </span>
            </div>
          </div>
          {renderNFTs()}
          {numNFTs < nfts.length && (
            <Button onClick={() => setNumNFTs(numNFTs + 12)} variant="scroll">
              {t('pages.viewNFTs.loadMore')}
            </Button>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
