import { useAtom } from 'jotai';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/future/image';
import { useEffect } from 'react';
import { isLandingPageLoadedAtom } from '../../atoms';
import { Footer, Navbar } from '../common';
import Communities from './Communities';
import Featured from './Featured';
import Header from './Header';
import bgCommunityFeaturedMobile from './images/community-featured/bg-community-featured-mobile.png';
import bgCommunityFeatured from './images/community-featured/bg-community-featured.png';
import Intro from './Intro';
import Partners from './Partners';
// import Signup from './Signup';

export default function PageLanding() {
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
          <Featured />
        </div>
        {/* <Signup /> */}
        <Footer />
      </div>
    </>
  );
}
