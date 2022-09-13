import useTranslation from 'next-translate/useTranslation';
import Button from '../Button';
import { ReactComponent as ChevronLeftIcon } from '../images/icon-chevron-left.svg';
import { ReactComponent as ChevronRightIcon } from '../images/icon-chevron-right.svg';
import classNames from 'classnames';

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface Props extends ButtonProps {
  scroll: (scrollOffset) => void;
  mobile?: boolean;
}
export default function ScrollButtons({
  className,
  scroll,
  mobile = false,
}: Props) {
  const { t } = useTranslation();

  return (
    <div className={classNames('flex items-center gap-3', className)}>
      <Button
        className="w-[3.125rem] h-[3.125rem]"
        variant="scroll"
        onClick={() => scroll(-680)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        className="w-[3.125rem] h-[3.125rem]"
        variant="scroll"
        onClick={() => scroll(680)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        className={classNames(
          'h-[3.125rem] font-sans',
          !mobile && 'w-[11.875rem]',
          mobile && 'w-full'
        )}
        variant="scroll"
      >
        {t('common.buttonBrowseMore')}
      </Button>
    </div>
  );
}
