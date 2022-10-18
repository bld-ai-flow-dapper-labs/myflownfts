import { BASE_URL, NFT } from '@myflownfts/data-access';
import { isLandingPageLoadedAtom } from '@myflownfts/site/atoms';
import { useAtom } from 'jotai';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/future/image';
import { useEffect } from 'react';
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
              url: `${BASE_URL}/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbg-header.f3121f3f.png&w=1920&q=100`,
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
            content: `${BASE_URL}/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbg-header.f3121f3f.png&w=1920&q=100`,
          },
          { property: 'Content-Type', content: 'text/html; charset=UTF-8' },
        ]}
      />
      <div className="w-full">
        <Navbar />
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
