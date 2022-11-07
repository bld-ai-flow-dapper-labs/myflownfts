import { sendSignupEmail } from '@myflownfts/site/api';
import { isLandingPageLoadedAtom } from '@myflownfts/site/atoms';
import { initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set } from 'firebase/database';
import { useAtom } from 'jotai';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/future/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, TextInput } from '../common';
import { ReactComponent as Logo } from '../common/images/icon-flow.svg';
import bgSignupMobile from './images/signup/bg-signup-mobile.png';
import bgSignup from './images/signup/bg-signup.png';

export default function Signup() {
  const { t } = useTranslation();
  const [isLandingPageLoaded] = useAtom(isLandingPageLoadedAtom);
  const [email, setEmail] = useState('');
  const [db, setDb] = useState<Database>();
  const mailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  useEffect(() => {
    const app = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    });
    const db = getDatabase(app);
    setDb(db);
  }, []);

  const handleSubmit = async () => {
    const datetime = new Date().toISOString().split('.')[0];
    try {
      if (email.match(mailRegex)) {
        set(ref(db, 'emails/' + datetime), email);
        await sendSignupEmail(email);
        toast(t('pages.landing.flowCommunity.success'), { type: 'success' });
        setEmail('');
      } else
        toast(t('error.pages.landing.flowCommunity.email'), { type: 'error' });
    } catch (e) {
      console.error(e);
      toast(t('error.pages.landing.flowCommunity.signup'), { type: 'error' });
    }
  };

  // Without handler, enter on email input refreshes the page
  const handleEnter = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      document.getElementById('btn-submit').click();
    }
  };

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

      <form className="flex items-center justify-center w-full pt-12">
        <TextInput
          containerClassName="md:w-96 w-full bg-white rounded-md rounded-r-none"
          className="text-black h-[3.125rem]"
          placeholder={t('pages.landing.flowCommunity.email')}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleEnter}
          value={email}
        />
        <Button
          onClick={handleSubmit}
          id="btn-submit"
          className="min-w-fit rounded-l-none h-[3.125rem] text-button font-semibold"
        >
          {t('pages.landing.flowCommunity.signup')}
        </Button>
      </form>
    </div>
  );
}
