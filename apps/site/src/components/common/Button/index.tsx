import React, { forwardRef } from 'react';
import classNames from 'classnames';
import Link from 'next/link';

interface BaseProps {
  disabled?: boolean;
  endIcon?: React.ReactNode;
  endText?: string;
  startIcon?: React.ReactNode;
  variant?: 'light' | 'dark' | 'transparent' | 'scroll' | 'custom';
}

interface AnchorProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  href: string;
}

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  href?: never;
}

type Props = (BaseProps & AnchorProps) | (BaseProps & ButtonProps);

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, Props>(
  function Button(
    {
      children,
      className,
      disabled,
      endIcon,
      href,
      startIcon,
      variant = 'dark',
      ...otherProps
    },
    ref
  ) {
    const buttonClassName = classNames(
      'inline-flex items-center justify-center px-5 py-3 text-button font-semibold rounded-lg',
      variant === 'dark' && 'text-white bg-indigo-600 hover:bg-indigo-700',
      variant === 'light' &&
        'text-indigo-600 bg-white rounded-lg text-button hover:bg-indigo-50',
      variant === 'scroll' && 'bg-scroll-button hover:bg-scroll-hover',
      className
    );

    const renderStartIcon = startIcon && (
      <div className="absolute left-0 p-6 -translate-y-1/2 top-1/2">
        {startIcon}
      </div>
    );

    const renderEndIcon = endIcon && (
      <div className="absolute right-0 p-6 -translate-y-1/2 top-1/2">
        {endIcon}
      </div>
    );

    if (href && !disabled) {
      return (
        <Link href={href}>
          <a
            className={buttonClassName}
            ref={ref as React.Ref<HTMLAnchorElement>}
            {...(otherProps as AnchorProps)}
          >
            {renderStartIcon}
            {children}
            {renderEndIcon}
          </a>
        </Link>
      );
    }

    const { type, ...buttonProps } = otherProps as ButtonProps;
    return (
      <button
        className={buttonClassName}
        disabled={disabled}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...buttonProps}
        type={type ?? 'button'}
      >
        {renderStartIcon}
        {children}
        {renderEndIcon}
      </button>
    );
  }
);

export default Button;
