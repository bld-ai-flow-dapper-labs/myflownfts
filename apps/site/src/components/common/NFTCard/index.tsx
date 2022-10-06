import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { Button, Chip } from '..';

interface Props {
  big?: boolean;
  chain: string;
  className?: string;
  contract: string;
  creatorName: string;
  creatorAvatar?: string;
  image_url: string;
  name: string;
  token_id: string;
  url: string;
  variant?: 'featured' | 'view';
}

export default function NFTCard({
  big = false,
  chain,
  className,
  contract,
  creatorName,
  creatorAvatar,
  image_url,
  name,
  token_id,
  url,
  variant = 'featured',
}: Props) {
  const { t } = useTranslation();

  const cleanString = (string) => {
    if (typeof string === 'string')
      return string
        .replace(/_/g, ' ')
        .replace(/-/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2');
  };

  return (
    <Button
      key={token_id}
      className={classNames(
        'group flex flex-col text-left truncate flex-grow-0',
        variant === 'featured' && 'h-[28.125rem] w-[20.5rem]',
        big && variant === 'featured'
          ? 'xl:w-[42.5rem] xl:h-[51.5rem] bg-container-dark/20 rounded-lg gap-4 xl:row-span-2'
          : 'xl:h-[25rem] bg-container-dark/20 rounded-lg gap-4',
        variant === 'view' &&
          'bg-container-dark/[0.05] hover:bg-container-dark/[0.1] w-[10.25rem] h-[13.75rem] lg:h-[27rem] lg:w-[19.5rem]',
        className
      )}
      variant="custom"
      href={url}
    >
      <div
        className={classNames(
          'relative flex justify-center items-center m-1 rounded-md overflow-hidden',
          big
            ? 'h-[25rem] w-[20rem] xl:w-[42rem] xl:h-[50rem]'
            : 'h-[25rem] w-[20rem]',
          variant === 'view' &&
            'h-[10rem] w-[9.75rem] lg:h-[20rem] lg:w-[19rem]'
        )}
      >
        <Image
          loader={() => image_url}
          src={image_url}
          alt={name}
          placeholder="empty"
          layout="fill"
          objectFit="cover"
          unoptimized={true}
          className="transition duration-300 ease-in-out delay-150 group-hover:scale-105"
        />
      </div>
      <div
        className={classNames(
          'flex flex-col font-bold text-white left-6 w-full',
          variant === 'featured' && 'text-h4 px-6 pb-6',
          variant === 'view' &&
            'text-mobile-sm lg:text-h4 px-3 lg:px-6 pb-3 lg:pb-6 -mt-[1.125rem] lg:mt-0'
        )}
      >
        <div className="flex items-center justify-between">
          {variant === 'featured' && (
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
              <div
                className={
                  (classNames('flex flex-col w-fit'),
                  big ? 'max-w-2/3' : 'max-w-[8rem]')
                }
              >
                <span className="block font-semibold font-body text-container-text text-body opacity-30">
                  {t('pages.landing.createdBy')}
                </span>
                <span className="block font-semibold truncate opacity-75 font-body text-container-text text-body">
                  {cleanString(creatorName)}
                </span>
              </div>
            </div>
          )}
          {variant === 'view' && (
            <span className="hidden font-semibold truncate opacity-75 lg:block font-body text-container-text text-body">
              {cleanString(creatorName)}
            </span>
          )}
          <Chip chain={chain} label={chain} className="h-6" />
        </div>
        <span
          className={classNames(
            'font-bold truncate text-title',
            variant === 'featured' && 'pt-4 ',
            variant === 'view' && 'pt-1.5 text-mobile-sm lg:text-tab'
          )}
        >
          {name ?? contract + ' #' + token_id}
        </span>
      </div>
    </Button>
  );
}
