import { useAtom } from 'jotai';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/future/image';
import { isLandingPageLoadedAtom } from '../../atoms';
import { Button, TextInput } from '../common';
import { ReactComponent as Logo } from '../common/images/icon-flow.svg';
import bgSignupMobile from './images/signup/bg-signup-mobile.png';
import bgSignup from './images/signup/bg-signup.png';

export default function Signup() {
  const { t } = useTranslation();
  const [isLandingPageLoaded] = useAtom(isLandingPageLoadedAtom);

  return (
    <div className="flex flex-col items-center h-full md:pb-16 pb-10 pt-[2.25rem] md:pt-16 px-[1.25rem] relative">
      <Image
        alt=""
        className="z-[-2] w-full object-cover md:hidden"
        fill
        placeholder="blur"
        src={bgSignupMobile}
        unoptimized={isLandingPageLoaded}
      />
      <Image
        alt=""
        className="z-[-2] w-full object-cover hidden md:block"
        fill
        placeholder="blur"
        src={bgSignup}
        unoptimized={isLandingPageLoaded}
      />
      <div className="flex items-center justify-center gap-3 -ml-5 md:ml-0">
        <Logo className="scale-50 md:scale-100" />
        <span className="pt-1 -ml-[1.125rem] font-bold text-white md:ml-0 text-body md:text-sm">
          {t('pages.landing.flowCommunity.title')}
        </span>
      </div>
      <div className="flex items-center justify-center w-full pt-12">
        <TextInput
          containerClassName="md:w-96 w-full bg-white rounded-md rounded-r-none"
          className="text-black h-[3.125rem]"
          placeholder={t('pages.landing.flowCommunity.email')}
        />
        <Button className="min-w-fit rounded-l-none h-[3.125rem] text-button font-semibold">
          {t('pages.landing.flowCommunity.signup')}
        </Button>
      </div>
    </div>
  );
}
