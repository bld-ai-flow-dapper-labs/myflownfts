import useTranslation from 'next-translate/useTranslation';
import { ReactComponent as ChevronLeftIcon } from './images/icon-chevron-left.svg';
import { ReactComponent as ChevronRightIcon } from './images/icon-chevron-right.svg';

export default function NavButtons() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-3">
      <button className="flex items-center justify-center w-16 h-16 rounded-lg bg-button-browse">
        <ChevronLeftIcon />
      </button>
      <button className="flex items-center justify-center w-16 h-16 rounded-lg bg-button-browse">
        <ChevronRightIcon />
      </button>
      <button className="flex items-center justify-center w-[11.875rem] h-16 rounded-lg bg-button-browse text-white">
        {t('pages.landing.buttonBrowseMore')}
      </button>
    </div>
  );
}
