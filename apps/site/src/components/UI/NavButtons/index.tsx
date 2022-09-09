import useTranslation from 'next-translate/useTranslation';
import Button from '../Button';
import { ReactComponent as ChevronLeftIcon } from './images/icon-chevron-left.svg';
import { ReactComponent as ChevronRightIcon } from './images/icon-chevron-right.svg';
import classnames from 'classnames';

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface Props extends ButtonProps {
  scroll: (scrollOffset) => void;
  mobile?: boolean;
}
export default function NavButtons({
  className,
  scroll,
  mobile = false,
}: Props) {
  const { t } = useTranslation();

  return (
    <div className={classnames('flex items-center gap-3', className)}>
      <Button
        className="w-[3.125rem] h-[3.125rem] bg-button-browse"
        variant="custom"
        onClick={() => scroll(-680)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        className="w-[3.125rem] h-[3.125rem] bg-button-browse"
        variant="custom"
        onClick={() => scroll(680)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        className={classnames(
          'h-[3.125rem] bg-button-browse text-white font-sans',
          !mobile && 'w-[11.875rem]',
          mobile && 'w-full'
        )}
        variant="custom"
      >
        {t('pages.landing.buttonBrowseMore')}
      </Button>
    </div>
  );
}
