import Image from 'next/image';

interface Props {
  chain: string;
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
  creatorName,
  token_id,
  name,
  image_url,
  url,
}: Props) {
  return (
    <a
      key={token_id}
      className="flex flex-col flex-shrink-0 w-fit h-fit"
      href={url}
    >
      <Image
        loader={() => image_url}
        src={image_url}
        width={327.5}
        height={476}
        alt={name}
        placeholder="empty"
      />
      <span className="relative font-bold text-white bottom-[2.75rem] left-6 text-h4">
        {name}
        {chain}
        {creatorName}
      </span>
    </a>
  );
}
