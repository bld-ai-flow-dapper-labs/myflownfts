import useTranslation from 'next-translate/useTranslation';
import { ReactComponent as Logo } from './images/logo.svg';
import { ReactComponent as DiscordIcon } from './images/icon-discord.svg';

export default function Signup() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center bg-signup h-[21.5rem] pt-16">
      <div className="flex items-center justify-center gap-3">
        <Logo />
        <span className="font-bold text-white text-h4">
          {t('pages.landing.flowCommunity.title')}
        </span>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          className="h-[3.125rem] my-10 rounded-md w-96 placeholder:pl-2"
          placeholder={t('pages.landing.flowCommunity.email')}
        />
        <button className="text-white py-3 px-[2.25rem] font-bold bg-secondary rounded-md h-[3.125rem]">
          {t('pages.landing.flowCommunity.signup')}
        </button>
      </div>
      <button className="flex justify-center items-center gap-2 py-3 px-[2.25rem] font-bold text-button-medium text-white bg-secondary rounded-md h-[3.125rem]">
        <DiscordIcon />
        {t('pages.landing.flowCommunity.discord')}
      </button>
    </div>
  );
}
