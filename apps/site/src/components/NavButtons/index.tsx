import useTranslation from 'next-translate/useTranslation';
import Button from '../Button';
import { ReactComponent as ChevronLeftIcon } from './images/icon-chevron-left.svg';
import { ReactComponent as ChevronRightIcon } from './images/icon-chevron-right.svg';

export default function NavButtons() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-3">
      <Button className="w-16 h-16 bg-button-browse" variant="custom">
        <ChevronLeftIcon />
      </Button>
      <Button className="w-16 h-16 bg-button-browse" variant="custom">
        <ChevronRightIcon />
      </Button>
      <Button
        className="w-[11.875rem] h-16 bg-button-browse text-white font-sans"
        variant="custom"
      >
        {t('pages.landing.buttonBrowseMore')}
      </Button>
    </div>
  );
}
