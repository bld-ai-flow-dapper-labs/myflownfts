import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

import { ReactComponent as Logo } from '../images/icon-flow-nofill.svg';
import { ReactComponent as DiscordIcon } from '../images/icon-discord.svg';
import { ReactComponent as GithubIcon } from '../images/icon-github.svg';
import { ReactComponent as TwitterIcon } from '../images/icon-twitter.svg';
import { ReactComponent as YoutubeIcon } from '../images/icon-youtube.svg';
import { ReactComponent as TelegramIcon } from '../images/icon-telegram.svg';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <div className="flex md:flex-row flex-col-reverse items-center justify-center md:justify-between w-full h-full md:h-[8.5rem] bg-gray-900 px-20">
      <Logo className="order-last my-6 text-primary md:order-first md:my-0" />
      <div className="flex flex-col items-center gap-6 md:pl-[6.75rem] place-self-center mb-[3.25rem] md:mb-0">
        <div className="flex items-center gap-6 text-white">
          <a href="http://onflow.org/discord" className="hover:text-gray-50">
            <DiscordIcon />
          </a>
          <a href="https://github.com/onflow" className="hover:text-gray-50">
            <GithubIcon />
          </a>
          <a
            href="https://twitter.com/flow_blockchain"
            className="hover:text-gray-50"
          >
            <TwitterIcon />
          </a>
          <a
            href="https://www.youtube.com/channel/UCs9r5lqmYQsKCpLB9jKwocg"
            className="hover:text-gray-50"
          >
            <YoutubeIcon />
          </a>
          <a
            href="https://t.me/s/flow_blockchain"
            className="hover:text-gray-50"
          >
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
        <a href="#" className="hover:text-gray-50">
          {t('pages.landing.footer.terms')}
        </a>
        <a href="#" className="hover:text-gray-50">
          {t('pages.landing.footer.contactUs')}
        </a>
      </div>
    </div>
  );
}
