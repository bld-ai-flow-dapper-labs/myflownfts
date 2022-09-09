import useTranslation from 'next-translate/useTranslation';
import { ReactComponent as Logo } from './images/signup/logo-filled.svg';
import { Button, TextInput } from '../UI';
// import { ReactComponent as DiscordIcon } from './images/icon-discord.svg';

export default function Signup() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center bg-signup-mobile md:bg-signup h-full md:pb-16 pb-10 pt-[2.25rem] md:pt-16 px-[1.25rem] bg-no-repeat bg-cover">
      <div className="flex items-center justify-center gap-3 -ml-5 md:ml-0">
        <Logo className="scale-50 md:scale-100" />
        <span className="pt-1 -ml-[1.125rem] font-bold text-white md:ml-0 text-body md:text-sm">
          {t('pages.landing.flowCommunity.title')}
        </span>
      </div>
      <div className="flex items-center justify-center w-full pt-12">
        <TextInput
          containerClassName="md:w-96 w-full bg-white rounded-md rounded-r-none"
          className="text-black h-[3.125rem] focus:outline-0"
          placeholder={t('pages.landing.flowCommunity.email')}
        />
        <Button className="min-w-fit rounded-l-none h-[3.125rem] text-button font-semibold">
          {t('pages.landing.flowCommunity.signup')}
        </Button>
      </div>
    </div>

    // Alternate with discord
    // <div className="flex flex-col items-center bg-signup h-[21.5rem] pt-16 bg-no-repeat bg-cover">
    //   <div className="flex items-center justify-center gap-3">
    //     <Logo />
    //     <span className="pt-1 text-sm font-bold text-white">
    //       {t('pages.landing.flowCommunity.title')}
    //     </span>
    //   </div>
    //   <div className="flex items-center">
    //     <input
    //       type="text"
    //       className="h-[3.125rem] my-10 rounded-md rounded-r-none w-96 placeholder:pl-6 placeholder:pt-4 placeholder:text-body placeholder:font-body"
    //       placeholder={t('pages.landing.flowCommunity.email')}
    //     />
    //     <button className="text-white py-3 px-[2.25rem] bg-indigo-600 rounded-md rounded-l-none h-[3.125rem] text-button font-semibold">
    //       {t('pages.landing.flowCommunity.signup')}
    //     </button>
    //   </div>
    //   <button className="flex justify-center items-center gap-2 py-3 px-[2.25rem] text-button font-semibold text-white bg-indigo-600 rounded-md h-[3.125rem]">
    //     <DiscordIcon />
    //     {t('pages.landing.flowCommunity.discord')}
    //   </button>
    // </div>
  );
}
