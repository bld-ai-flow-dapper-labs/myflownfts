import useTranslation from 'next-translate/useTranslation';
import { ReactComponent as Logo } from './images/logo-filled.svg';
import Button from '../Button';
// import { ReactComponent as DiscordIcon } from './images/icon-discord.svg';

export default function Signup() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center bg-signup h-[17rem] pt-16 bg-no-repeat bg-cover">
      <div className="flex items-center justify-center gap-3">
        <Logo />
        <span className="pt-1 text-sm font-bold text-white">
          {t('pages.landing.flowCommunity.title')}
        </span>
      </div>
      <div className="flex items-center pt-12">
        <input
          type="text"
          className="h-[3.125rem] rounded-md rounded-r-none w-96 placeholder:pl-6 placeholder:pt-4 placeholder:text-body placeholder:font-body"
          placeholder={t('pages.landing.flowCommunity.email')}
        />
        <Button className="px-[2.25rem] rounded-l-none h-[3.125rem] text-button font-semibold">
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
