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
    <div className="flex md:flex-row flex-col-reverse items-center justify-center md:justify-between w-full h-full md:h-[8.5rem] bg-gray-900 px-20">
      <Logo className="order-last my-6 md:order-first md:my-0" />
      <div className="flex flex-col items-center gap-6 md:pl-[6.75rem] place-self-center mb-[3.25rem] md:mb-0">
        <div className="flex items-center gap-6">
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
        <span className="text-gray-700 text-footer font-body">
          <Trans
            i18nKey="pages.landing.footer.title"
            components={{ bold: <strong /> }}
          />
        </span>
      </div>
      <div className="flex gap-[2.25rem] font-semibold text-white text-footer mb-6 md:mb-0">
        <a href="#">{t('pages.landing.footer.terms')}</a>
        <a href="#">{t('pages.landing.footer.contactUs')}</a>
      </div>
    </div>
  );
}
