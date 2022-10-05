import { ReactComponent as CopiedIcon } from '../images/icon-copied.svg';
import { ReactComponent as EthIcon } from '../images/icon-eth.svg';
import { ReactComponent as FindIcon } from '../images/icon-find.svg';
import { ReactComponent as FlowIcon } from '../images/icon-flow-nofill.svg';
import { ReactComponent as UsdIcon } from '../images/icon-usd.svg';

import classNames from 'classnames';

// Add icons of other chains when available
interface Props {
  chain?: string;
  className?: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'copied' | 'price' | 'find';
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
    case 'usd':
      newLabel = label !== chain ? label : 'USD';
      logo = <UsdIcon className="w-3 h-3" />;
      break;
    default:
      newLabel = label;
  }

  if (variant === 'copied') {
    logo = <CopiedIcon className="w-3 h-3 -translate-x-4" />;
  }
  if (variant === 'find') {
    logo = <FindIcon className="w-5 h-5" />;
  }

  return (
    <div
      className={classNames(
        'flex items-center gap-1 justify-center px-2 my-1.5 rounded-l-full rounded-r-full',
        (variant === 'primary' || variant === 'price') && 'bg-chip text-white',
        variant === 'secondary' &&
          'text-lightBlue gap-[0.625rem] bg-lightBlue/20 hover:bg-chip hover:text-white transition ease-in-out delay-50 duration-300',
        variant === 'copied' && 'transition ease-in-out delay-50 duration-300',
        variant === 'find' &&
          'text-find-primary gap-[0.625rem] bg-find-dark hover:bg-find-secondary hover:text-white transition ease-in-out delay-50 duration-300',
        className
      )}
    >
      <div
        className={classNames(
          variant === 'primary' && 'scale-100',
          (variant === 'secondary' || variant === 'price') && 'scale-150',
          variant === 'copied' && 'scale-150 justify-self-start',
          variant === 'price' && 'ml-1'
        )}
      >
        {logo}
      </div>
      <span
        className={classNames(
          'font-body truncate',
          variant === 'primary' && 'text-caption',
          variant === 'secondary' && 'text-body w-[6.25rem]',
          variant === 'price' && 'text-body font-body font-bold pl-2',
          variant === 'find' && 'text-body w-[6.25rem] text-center'
        )}
      >
        {newLabel}
      </span>
    </div>
  );
}
