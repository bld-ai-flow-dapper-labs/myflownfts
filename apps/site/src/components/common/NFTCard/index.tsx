import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { Chip } from '..';
import classNames from 'classnames';

interface Props {
  chain: string;
  className?: string;
  creatorName: string;
  creatorAvatar: string;
  token_id: string;
  name: string;
  image_url: string;
  url: string;
  big?: boolean;
}

export default function NFTCard({
  chain,
  className,
  creatorName,
  creatorAvatar,
  token_id,
  name,
  image_url,
  url,
  big,
}: Props) {
  const { t } = useTranslation();
  if (big) {
    return (
      <a
        key={token_id}
        className={classNames(
          'flex flex-grow-0 flex-col h-[28.125rem] w-[20.5rem] xl:w-[42.5rem] xl:h-[51.5rem] bg-container-dark/20 rounded-lg gap-6 xl:row-span-2',
          className
        )}
        href={url}
      >
        <div className="flex justify-center items-center m-1 rounded-md overflow-hidden h-[25rem] xl:h-[50rem] bg-white">
          <Image
            loader={() => image_url}
            src={image_url}
            width={800}
            height={900}
            alt={name}
            placeholder="empty"
            unoptimized={true}
          />
        </div>
        <div className="flex flex-col font-bold text-white break-words left-6 text-h4 h-[7.875rem] px-6">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <Image
                className="rounded-full"
                loader={() => creatorAvatar}
                src={creatorAvatar}
                width={40}
                height={40}
                alt={name}
                placeholder="empty"
                unoptimized={true}
              />
              <div className="flex flex-col w-fit max-w-2/3">
                <span className="block font-semibold font-body text-container-text text-body opacity-30">
                  {t('pages.landing.createdBy')}
                </span>
                <span className="block font-semibold truncate opacity-75 font-body text-container-text text-body">
                  {creatorName}
                </span>
              </div>
            </div>
            <Chip chain={chain} label={chain} />
          </div>
          <span className="pt-4 font-bold text-title">{name}</span>
        </div>
      </a>
    );
  } else
    return (
      <a
        key={token_id}
        className={classNames(
          'flex flex-col h-[28.125rem] w-[20.5rem] xl:h-[25rem] bg-container-dark/20 rounded-lg gap-6',
          className
        )}
        href={url}
      >
        <div className="flex justify-center items-center m-1 rounded-md overflow-hidden h-[25.75rem] xl:h-[16.875rem]">
          <Image
            loader={() => image_url}
            src={image_url}
            width={320}
            height={320}
            alt={name}
            placeholder="empty"
            unoptimized={true}
          />
        </div>
        <div className="flex flex-col font-bold text-white break-words left-6 text-h4 h-[7.875rem] px-6 pb-4">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <Image
                className="rounded-full"
                loader={() => creatorAvatar}
                src={creatorAvatar}
                width={40}
                height={40}
                alt={name}
                placeholder="empty"
                unoptimized={true}
              />
              <div className="flex flex-col w-fit max-w-[8rem]">
                <span className="block font-semibold font-body text-container-text text-body opacity-30">
                  {t('pages.landing.createdBy')}
                </span>
                <span className="block font-semibold truncate opacity-75 font-body text-container-text text-body">
                  {creatorName}
                </span>
              </div>
            </div>
            <Chip chain={chain} label={chain} />
          </div>
          <span className="pt-4 font-bold truncate text-title">{name}</span>
        </div>
      </a>
    );
}
