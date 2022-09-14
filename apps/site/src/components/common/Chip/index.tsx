import { ReactComponent as CopiedIcon } from '../images/icon-copied.svg';
import { ReactComponent as EthIcon } from '../images/icon-eth.svg';
import { ReactComponent as FlowIcon } from '../images/icon-flow-nofill.svg';

import classNames from 'classnames';

// Add icons of other chains when available
interface Props {
  chain?: string;
  className?: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'copied';
}

export default function Chip({
  className,
  chain,
  label,
  variant = 'primary',
}: Props) {
  let newLabel;
  let logo;

  switch (chain) {
    case 'ethereum':
      newLabel = label !== chain ? label : 'ETH';
      logo = <EthIcon className="w-3 h-3" />;
      break;
    case 'flow':
      newLabel = label !== chain ? label : 'FLOW';
      logo = <FlowIcon className="w-3 h-3" />;
      break;
    case 'polygon':
      newLabel = label !== chain ? label : 'MATIC';
      break;
    case 'solana':
      newLabel = label !== chain ? label : 'SOL';
      break;
    case 'optimism':
      newLabel = label !== chain ? label : 'OP';
      break;
    case 'arbitrum':
      newLabel = label !== chain ? label : 'ARB';
      break;
    default:
      newLabel = label;
  }

  if (variant === 'copied') {
    logo = <CopiedIcon className="w-3 h-3 -translate-x-4" />;
  }

  return (
    <div
      className={classNames(
        'flex items-center justify-center gap-1 px-2 my-1.5 rounded-l-full rounded-r-full',
        variant === 'primary' && 'bg-chip text-white',
        (variant === 'secondary' || variant === 'copied') &&
          'text-lightBlue gap-[0.625rem] bg-lightBlue/20 hover:bg-chip hover:text-white transition ease-in-out delay-150 duration-300',
        className
      )}
    >
      <div
        className={classNames(
          variant === 'primary' && 'scale-100',
          (variant === 'secondary' || variant === 'copied') && 'scale-150'
        )}
      >
        {logo}
      </div>
      <span
        className={classNames(
          'font-body',
          variant === 'primary' && 'text-caption',
          variant === 'secondary' && 'text-body w-[6.25rem] truncate'
        )}
      >
        {newLabel}
      </span>
    </div>
  );
}
