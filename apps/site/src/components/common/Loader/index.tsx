import classNames from 'classnames';
import React from 'react';
import { ReactComponent as Logo } from '../images/icon-flow.svg';
import { ReactComponent as Loading } from '../images/icon-loading.svg';

export default function Loader({ className }) {
  return (
    <div className={classNames('relative scale-125', className)}>
      <Loading className="absolute animate-spin" />
      <Logo className="scale-75" />
    </div>
  );
}
