import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

import { ReactComponent as Logo } from './images/logo-clear.svg';
import { ReactComponent as DiscordIcon } from './images/icon-discord.svg';
import { ReactComponent as GithubIcon } from './images/icon-github.svg';
import { ReactComponent as TwitterIcon } from './images/icon-twitter.svg';
import { ReactComponent as YoutubeIcon } from './images/icon-youtube.svg';
import { ReactComponent as TelegramIcon } from './images/icon-telegram.svg';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between h-[8.5rem] bg-gray-900 px-20">
      <Logo />
      <div className="flex flex-col items-center justify-center gap-6 pl-[6.75rem]">
        <div className="flex gap-6">
          <a href="#">
            <DiscordIcon />
          </a>
          <a href="#">
            <GithubIcon />
          </a>
          <a href="#">
            <TwitterIcon />
          </a>
          <a href="#">
            <YoutubeIcon />
          </a>
          <a href="#">
            <TelegramIcon />
          </a>
        </div>
        <span className="text-gray-700 text-footer">
          <Trans
            i18nKey="pages.landing.footer.title"
            components={{ bold: <strong /> }}
          />
        </span>
      </div>
      <div className="flex gap-[2.25rem]">
        <a href="#" className="font-semibold text-white text-footer">
          {t('pages.landing.footer.terms')}
        </a>
        <a href="#">{t('pages.landing.footer.contactUs')}</a>
      </div>
    </div>
  );
}
