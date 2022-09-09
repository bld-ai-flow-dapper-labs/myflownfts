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
    <div className="flex flex-col gap-[3.375rem] pt-12 xl:pt-[8.375rem] px-5 xl:px-[16.75rem]">
      <div className="flex items-center justify-center lg:py-4 lg:justify-between">
        <div className="flex items-center gap-[1.125rem] lg:gap-6 2xl:gap-12">
          <StarIcon />
          <span className="font-bold text-white text-mobile-section lg:text-h3 2xl:text-section">
            {t('pages.landing.ourCommunities')}
          </span>
          <StarIcon />
        </div>
        <NavButtons className="hidden lg:flex" scroll={scroll} />
      </div>
      <div
        className="flex gap-6 -mt-[1.875rem] overflow-x-scroll xl:mt-0 xl:pb-10 scrollbar-mobile xl:scrollbar scroll-smooth"
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
        // sm:self-center sm:w-80, for centered and constrained size
        className="flex -mt-[1.875rem] lg:hidden"
        scroll={scroll}
        mobile
      />
    </div>
  );
}
