import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/future/image';
import { Footer, Navbar } from '../common';
import Communities from './Communities';
import Featured from './Featured';
import Header from './Header';
import bgCommunityFeaturedMobile from './images/community-featured/bg-community-featured-mobile.png';
import bgCommunityFeatured from './images/community-featured/bg-community-featured.png';
import Intro from './Intro';
import Partners from './Partners';
import Signup from './Signup';

export default function PageLanding() {
  const { t } = useTranslation();

  return (
    <>
      <NextSeo
        description={t('pages.landing.meta.description')}
        title={t('pages.landing.meta.title')}
      />
      <div>
        <Navbar />
        <Header />
        <Intro />
        <Partners />
        <div className="h-full relative">
          <Image
            alt=""
            className="z-[-2] w-full object-cover lg:hidden"
            fill
            src={bgCommunityFeaturedMobile}
            unoptimized
          />
          <Image
            alt=""
            className="z-[-2] w-full object-cover hidden lg:block"
            fill
            src={bgCommunityFeatured}
            unoptimized
          />
          <Communities />
          <Featured />
        </div>
        <Signup />
        <Footer />
      </div>
    </>
  );
}
