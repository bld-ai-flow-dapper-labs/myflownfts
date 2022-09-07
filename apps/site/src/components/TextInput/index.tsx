import React from 'react';
import classNames from 'classnames';
import { ReactComponent as SearchIcon } from './images/icon-search.svg';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface TextInputProps extends InputProps {
  containerClassName?: string;
  endIcon?: React.ReactNode;
  endText?: string;
  searchBar?: boolean;
  startIcon?: React.ReactNode;
  styling?: 'light' | 'dark' | 'transparent';
}

export default function TextInput({
  className,
  containerClassName,
  disabled,
  endIcon,
  placeholder,
  searchBar,
  startIcon,
  styling = 'dark',
  value,
  ...otherProps
}: TextInputProps) {
  return (
    <div className={classNames('box-border relative', containerClassName)}>
      {startIcon && (
        <div className="absolute left-0 p-6 -translate-y-1/2 top-1/2">
          {startIcon}
        </div>
      )}
      <input
        type="text"
        className={classNames(
          'rounded-md py-4 px-6 text-body font-body text-white truncate box-border w-full h-full',
          styling === 'dark' && 'bg-container-dark',
          startIcon && 'pl-10',
          (endIcon || searchBar) && 'pr-10',
          className
        )}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        {...otherProps}
      />
      {(searchBar || endIcon) && (
        <div className="absolute right-0 p-6 -translate-y-1/2 top-1/2">
          {searchBar ? <SearchIcon /> : endIcon}
        </div>
      )}
    </div>
  );
}
