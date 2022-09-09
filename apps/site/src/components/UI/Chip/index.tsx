import { ReactComponent as FlowIcon } from './images/flow.svg';
import { ReactComponent as EthIcon } from './images/eth.svg';

// Add icons of other chains when available
interface Props {
  label: string;
  chain?: string;
}

export default function Chip({ label, chain }: Props) {
  let newLabel;
  let logo;

  switch (chain) {
    case 'ethereum':
      newLabel = 'ETH';
      logo = <EthIcon className="w-3 h-3" />;
      break;
    case 'flow':
      newLabel = 'FLOW';
      logo = <FlowIcon className="w-3 h-3" />;
      break;
    case 'polygon':
      newLabel = 'MATIC';
      break;
    case 'solana':
      newLabel = 'SOL';
      break;
    case 'optimism':
      newLabel = 'OP';
      break;
    case 'arbitrum':
      newLabel = 'ARB';
      break;
    default:
      newLabel = label;
  }
  return (
    <div className="flex items-center justify-center gap-1 px-2 my-1.5 rounded-l-full rounded-r-full bg-chip">
      {logo}
      <span className="text-caption font-body">{newLabel}</span>
    </div>
  );
}
