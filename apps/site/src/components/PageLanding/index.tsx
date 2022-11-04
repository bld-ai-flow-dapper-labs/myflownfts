import { BASE_URL, NFT } from '@myflownfts/data-access';
import { isLandingPageLoadedAtom } from '@myflownfts/site/atoms';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/future/image';
import { useEffect, useState } from 'react';
import { Footer, Navbar } from '../common';
import Communities from './Communities';
import Featured from './Featured';
import Header from './Header';
import bgCommunityFeaturedMobile from './images/community-featured/bg-community-featured-mobile.png';
import bgCommunityFeatured from './images/community-featured/bg-community-featured.png';
import Intro from './Intro';
import Partners from './Partners';

interface Props {
  nfts: NFT[];
}

export default function PageLanding({ nfts }: Props) {
  const { t } = useTranslation();
  const [isLandingPageLoaded, setIsLandingPageLoaded] = useAtom(
    isLandingPageLoadedAtom
  );
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onPageLoad = () => {
      setIsLandingPageLoaded(true);
    };

    // Check if the page has already loaded
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, [setIsLandingPageLoaded]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < window.innerHeight / 2) setIsScrolled(false);
      else setIsScrolled(true);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });

  return (
    <>
      <NextSeo
        description={t('pages.landing.meta.description')}
        title={t('pages.landing.meta.title')}
        openGraph={{
          description: t('pages.landing.meta.description'),
          type: 'text/html; charset=UTF-8',
          images: [
            {
              url: `${BASE_URL}/og-image.png`,
            },
          ],
        }}
        twitter={{ site: 'MyFlowNFTs', cardType: 'summary_large_image' }}
        additionalMetaTags={[
          {
            property: 'twitter:title',
            content: t('pages.landing.meta.title'),
          },
          {
            property: 'twitter:description',
            content: t('pages.landing.meta.description'),
          },
          {
            property: 'twitter:image',
            content: `${BASE_URL}/twitter-image.png`,
          },
          { property: 'Content-Type', content: 'text/html; charset=UTF-8' },
        ]}
      />
      <div className="w-full">
        <Navbar
          className={classNames(
            'lg:!fixed transition ease-in-out duration-300',
            isScrolled && 'lg:!bg-navbar/90 lg:!backdrop-blur-xl'
          )}
          search={isScrolled}
        />
        <Header />
        <Intro />
        <Partners />
        <div className="relative h-full">
          <Image
            alt=""
            className="z-[-2] w-full object-cover lg:hidden"
            fill
            placeholder="blur"
            src={bgCommunityFeaturedMobile}
            unoptimized={isLandingPageLoaded}
          />
          <Image
            alt=""
            className="z-[-2] w-full object-cover hidden lg:block"
            fill
            placeholder="blur"
            quality="100"
            src={bgCommunityFeatured}
            unoptimized={isLandingPageLoaded}
          />
          <Communities />
          <Featured nfts={nfts} />
        </div>
        {/* <Signup /> */}
        <Footer />
      </div>
    </>
  );
}
