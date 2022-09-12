import { useRouter } from 'next/router';
import { Button, Chip, NFTCard } from '../common';
import nfts from '../PageLanding/json/nfts.json';

import { Navbar, Footer } from '../common';
export default function PageViewNFTs() {
  const router = useRouter();
  const address = router.query.address;

  return (
    <div>
      <Navbar className="!bg-navbar-account" search />
      <div className="h-[25rem] bg-gradient-to-b from-white to-indigo-600"></div>
      <div className="relative flex flex-col items-center w-full">
        <div className="absolute bg-gradient-to-r from-black to-indigo-600 rounded-full w-[15rem] h-[15rem] -top-[11.875rem]" />
        <div className="flex flex-col items-center px-32 bg-gray-900">
          <div className="flex items-center pt-[4.625rem] pb-12 gap-3">
            <Chip
              className="w-40 h-[2.375rem]"
              label="0x0f653af8cea6e890"
              chain="flow"
              variant="secondary"
            />
            <Button
              className="flex items-center justify-center w-8 h-8 px-0 pt-1.5 text-center"
              variant="scroll"
            >
              <span className="text-white">...</span>
            </Button>
          </div>
          <div className="flex items-center justify-center w-screen border-b-[1px] border-container-dark/10">
            <div className="flex items-center gap-2 pb-3 border-b-4 border-indigo-600 w-fit">
              <span className="font-semibold text-white text-tab">Owned</span>
              <span className="justify-center items-center flex h-5 font-medium text-indigo-500 w-[1.75rem] bg-indigo-600/10 font-body text-count">
                {nfts.length}
              </span>
            </div>
          </div>
          {nfts.length > 0 ? (
            <div className="grid grid-flow-row grid-cols-5 gap-6 py-12">
              {nfts.map((item) => (
                <NFTCard
                  className="!bg-container-dark/[0.05]"
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
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center font-body pt-12 pb-[14.875rem]">
              <span className="font-semibold text-white">
                No items to display
              </span>
              <span className="font-medium text-gray-100">
                This wallet does not own NFTs yet.
              </span>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
