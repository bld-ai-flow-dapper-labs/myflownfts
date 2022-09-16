import classNames from 'classnames';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import { Button } from '..';

import { ReactComponent as DiscordIcon } from '../images/icon-discord.svg';
import { ReactComponent as Logo } from '../images/icon-flow-nofill.svg';
import { ReactComponent as GithubIcon } from '../images/icon-github.svg';
import { ReactComponent as TelegramIcon } from '../images/icon-telegram.svg';
import { ReactComponent as TwitterIcon } from '../images/icon-twitter.svg';
import { ReactComponent as YoutubeIcon } from '../images/icon-youtube.svg';

interface Props {
  className?: string;
}

export default function Footer({ className }: Props) {
  const { t } = useTranslation();
  return (
    <div
      className={classNames(
        'flex lg:flex-row flex-col-reverse items-center justify-center place-self-end lg:justify-between w-full h-fit lg:h-[8.5rem] bg-gray-900 px-20',
        className
      )}
    >
      <Logo className="order-last my-6 text-primary lg:order-first lg:my-0" />
      <div className="flex flex-col items-center gap-6 lg:translate-x-20 mb-[3.25rem] lg:mb-0">
        <div className="flex items-center gap-6 text-white">
          <Button
            href="http://onflow.org/discord"
            className="hover:text-gray-50"
            variant="custom"
          >
            <DiscordIcon />
          </Button>
          <Button
            href="https://github.com/onflow"
            className="hover:text-gray-50"
            variant="custom"
          >
            <GithubIcon />
          </Button>
          <Button
            href="https://twitter.com/flow_blockchain"
            className="hover:text-gray-50"
            variant="custom"
          >
            <TwitterIcon />
          </Button>
          <Button
            href="https://www.youtube.com/channel/UCs9r5lqmYQsKCpLB9jKwocg"
            className="hover:text-gray-50"
            variant="custom"
          >
            <YoutubeIcon />
          </Button>
          <Button
            href="https://t.me/s/flow_blockchain"
            className="hover:text-gray-50"
            variant="custom"
          >
            <TelegramIcon />
          </Button>
        </div>
        <span className="text-gray-700 text-footer font-body">
          <Trans
            i18nKey="pages.landing.footer.title"
            components={{ bold: <strong /> }}
          />
        </span>
      </div>
      <div className="flex gap-[2.25rem] font-semibold text-white text-footer mb-6 lg:mb-0">
        <Button href="#" className="hover:text-gray-50" variant="custom">
          {t('pages.landing.footer.terms')}
        </Button>
        <Button
          href="#"
          className="hover:text-gray-50 whitespace-nowrap"
          variant="custom"
        >
          {t('pages.landing.footer.contactUs')}
        </Button>
      </div>
    </div>
  );
}
