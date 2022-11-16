import { isLandingPageLoadedAtom } from '@myflownfts/site/atoms';
import { useAtom } from 'jotai';
import useTranslation from 'next-translate/useTranslation';
import { useRef } from 'react';
import { ScrollButtons } from '../common';
import { ReactComponent as StarIcon } from '../common/images/icon-section-star.svg';
import CommunityCard from './CommunityCard';
import { CommunityList } from './CommunityList';

export default function Communities() {
  const { t } = useTranslation();
  const scrollRef = useRef(null);
  const [isLandingPageLoaded] = useAtom(isLandingPageLoadedAtom);

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  return (
    <div className="flex flex-col gap-[3.375rem] pt-12 xl:pt-[8.375rem] px-5 w-full max-w-[45rem] xl:max-w-[67rem] 2xl:max-w-[89rem] 3xl:max-w-[111rem] mx-auto">
      <div className="flex items-center justify-center lg:py-4 md:justify-between">
        <div className="flex items-center gap-[1.125rem] lg:gap-6 2xl:gap-12">
          <StarIcon className="text-yellow" />
          <span className="font-bold text-white text-mobile-section xl:text-h3 2xl:text-section">
            {t('pages.landing.ourCommunities')}
          </span>
          <StarIcon className="text-yellow" />
        </div>
        <ScrollButtons
          className="hidden md:flex"
          scroll={scroll}
          href="https://www.flowverse.co/rankings"
          offset={703}
        />
      </div>
      <div
        className="flex gap-6 -mt-[1.875rem] overflow-x-scroll xl:mt-0 xl:pb-10 scrollbar-mobile xl:scrollbar scroll-smooth"
        ref={scrollRef}
      >
        {CommunityList.map((item) => (
          <CommunityCard
            key={item.id}
            name={item.name}
            image={item.image}
            url={item.url}
            unoptimized={isLandingPageLoaded}
          />
        ))}
      </div>
      <ScrollButtons
        className="flex -mt-[1.875rem] md:hidden"
        scroll={scroll}
        mobile
        href="https://www.flowverse.co/rankings"
        offset={703}
      />
    </div>
  );
}
