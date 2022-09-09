import Image from 'next/image';

interface Props {
  name: string;
  image: string;
  url: string;
}

export default function CommunityCard({ name, image, url }: Props) {
  return (
    <a className="flex flex-col flex-shrink-0 w-fit h-fit" href={url}>
      <Image
        src={image}
        width={327.5}
        height={476}
        alt={name}
        placeholder="empty"
        unoptimized={true}
      />
      <span className="relative font-bold text-white bottom-[2.75rem] left-6 text-h4">
        {name}
      </span>
    </a>
  );
}
