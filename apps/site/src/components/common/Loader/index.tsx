import classNames from 'classnames';
import React from 'react';
import { ReactComponent as Logo } from '../images/icon-flow.svg';
import { ReactComponent as Loading } from '../images/icon-loading.svg';

export default function Loader({
  className,
  ...otherProps
}: React.SVGProps<SVGSVGElement>) {
  return (
    <div className={classNames('relative', className)}>
      <Loading className="absolute text-white animate-spin" />
      <Logo className="scale-75" />
    </div>
  );
}