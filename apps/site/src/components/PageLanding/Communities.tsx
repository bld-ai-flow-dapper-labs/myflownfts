import useTranslation from 'next-translate/useTranslation';
import { ReactComponent as StarIcon } from './images/icon-star-yellow.svg';
import NavButtons from '../NavButtons';
import CommunityCard from './CommunityCard';
import communities from './json/communities.json';
import { useRef } from 'react';

export default function Communities() {
  const { t } = useTranslation();
  const scrollRef = useRef(null);

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  return (
    <div className="flex flex-col gap-[3.375rem] pt-[8.375rem] px-[16.75rem]">
      <div className="flex justify-between py-4">
        <div className="flex items-center gap-12">
          <StarIcon />
          <span className="font-bold text-white text-section">
            {t('pages.landing.ourCommunities')}
          </span>
          <StarIcon />
        </div>
        <NavButtons scroll={scroll} />
      </div>
      <div
        className="flex gap-6 pb-10 overflow-x-scroll scrollbar scroll-smooth"
        ref={scrollRef}
      >
        {communities.map((item) => (
          <CommunityCard
            key={item.key}
            name={item.name}
            image={item.image}
            url={item.url}
          />
        ))}
      </div>
    </div>
  );
}
