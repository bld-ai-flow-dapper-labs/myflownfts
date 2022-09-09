import useTranslation from 'next-translate/useTranslation';
import { ReactComponent as StarIcon } from './images/community-featured/icon-star-yellow.svg';
import { NavButtons } from '../UI';
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
    <div className="flex flex-col gap-[3.375rem] pt-12 md:pt-[8.375rem] px-5 md:px-[16.75rem]">
      <div className="flex items-center justify-center md:py-4 md:justify-between">
        <div className="flex items-center gap-[1.125rem] md:gap-12">
          <StarIcon />
          <span className="font-bold text-white text-mobile-section md:text-section">
            {t('pages.landing.ourCommunities')}
          </span>
          <StarIcon />
        </div>
        <NavButtons className="hidden md:flex" scroll={scroll} />
      </div>
      <div
        className="flex gap-6 -mt-[1.875rem] overflow-x-scroll md:mt-0 md:pb-10 scrollbar-mobile md:scrollbar scroll-smooth"
        ref={scrollRef}
      >
        {communities.map((item) => (
          <CommunityCard
            key={item.id}
            name={item.name}
            image={item.image}
            url={item.url}
          />
        ))}
      </div>
      <NavButtons
        className="flex -mt-[1.875rem] md:hidden"
        scroll={scroll}
        mobile
      />
    </div>
  );
}
