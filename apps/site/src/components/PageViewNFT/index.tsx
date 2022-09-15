import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getNFTByTokenId } from '../../api';
import type { NFT } from '../../api/types';
import { ReactComponent as LinkIcon } from '../../components/common/images/icon-link.svg';
import { ReactComponent as RefreshIcon } from '../../components/common/images/icon-refresh.svg';
import { ReactComponent as ShareIcon } from '../../components/common/images/icon-share.svg';
import { Button, Navbar } from '../common';

export default function PageViewNFT() {
  const router = useRouter();
  const contract_address = router.query.contract_address as string;
  const token_id = router.query.token_id as string;
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<NFT>();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getNFTByTokenId(contract_address, token_id, 'flow');
      console.log(data);
      setToken(data);
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen bg-navbar">
      <Navbar className="relative" />

      {!isLoading && token && (
        <div className="flex w-full gap-[10.375rem]">
          <div className="flex items-start justify-end w-1/2 pt-[5.25rem]">
            <div
              className={classNames(
                'relative rounded-md overflow-hidden w-[43.125rem] h-[43.125rem]'
              )}
            >
              {token.video_url ? (
                <video
                  autoPlay
                  loop
                  className="border-4 w-fit h-fit border-container-dark/10"
                >
                  <source src={token.video_url} />
                </video>
              ) : (
                <Image
                  loader={() => token.image_url}
                  src={token.image_url}
                  alt={token.name}
                  placeholder="empty"
                  layout="fill"
                  objectFit="cover"
                  unoptimized={true}
                  className="transition duration-300 ease-in-out delay-150 border-4 group-hover:scale-105 border-container-dark/10"
                />
              )}
            </div>
          </div>

          <div className="flex flex-col w-1/2 pr-[16.875rem] pt-8">
            <div className="flex items-center self-end gap-3 pb-4">
              <Button
                className="flex items-center justify-center w-8 h-8 px-0"
                variant="scroll"
                onClick={() => router.replace(router.asPath)}
              >
                <RefreshIcon />
              </Button>
              <Button
                className="flex items-center justify-center w-8 h-8 px-0 "
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
            <div className="flex flex-col min-w-[20rem] w-fit gap-6 p-6 border-4 rounded-md border-container-dark/10 h-fit">
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
                <div className={classNames('flex flex-col w-fit max-w-[8rem]')}>
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
                {token.description}
              </span>
              <Button className="gap-2" href={token?.external_url}>
                <span>{t('pages.viewNFT.buyOnMarketplace')}</span>
                <LinkIcon />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
