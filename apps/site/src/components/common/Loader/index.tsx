import classNames from 'classnames';
import React from 'react';
import { ReactComponent as Logo } from '../images/icon-flow.svg';
import { ReactComponent as Loading } from '../images/icon-loading.svg';

interface Props {
  className?: string;
}

export default function Loader({ className }: Props) {
  return (
    <div className={classNames('relative scale-125 w-fit', className)}>
      <Loading className="absolute animate-spin" />
      <Logo className="scale-75" />
    </div>
  );
}
