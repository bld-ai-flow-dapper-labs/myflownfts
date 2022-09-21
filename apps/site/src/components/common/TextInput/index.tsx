import React from 'react';
import classNames from 'classnames';
import { Button } from '..';
import { ReactComponent as SearchIcon } from '../images/icon-search.svg';
import { ReactComponent as CloseIcon } from '../images/icon-close.svg';

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
    <div
      className={classNames(
        'group box-border relative flex',
        containerClassName
      )}
    >
      {startIcon && (
        <div className="absolute left-0 p-3 -translate-y-1/2 top-1/2">
          {startIcon}
        </div>
      )}
      <input
        type="text"
        className={classNames(
          'rounded-md pb-4 pt-3 px-6 text-body font-body text-white truncate box-border w-full h-full',
          styling === 'dark' && 'bg-container-dark/10',
          startIcon && 'pl-10',
          (endIcon || searchBar) && 'pr-20',
          className
        )}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        {...otherProps}
      />
      {(searchBar || endIcon) && (
        <div className="absolute right-0 p-3 -translate-y-1/2 top-1/2">
          {searchBar ? (
            <>
              <Button
                className="text-white rounded-md bg-container-dark/[.15]"
                variant="custom"
              >
                <SearchIcon className="inline group-focus-within:hidden" />
                <CloseIcon className="w-[40px] h-[40px] scale-50 hidden group-focus-within:inline" />
              </Button>
            </>
          ) : (
            endIcon
          )}
        </div>
      )}
    </div>
  );
}
