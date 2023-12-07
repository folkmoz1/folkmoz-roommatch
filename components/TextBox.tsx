'use client';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { clsx } from 'clsx';
import { FieldError } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value?: string;
  placeholder?: string;
  InputClassName?: string;
  passwordWithIcon?: boolean;
  Icon?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  InputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  error?: FieldError | undefined;
}

export const TextBox = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      name,
      type = 'text',
      value = '',
      placeholder,
      Icon,
      passwordWithIcon,
      onChange,
      InputProps,
      InputClassName,
      error,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const showPasswordType = showPassword ? 'text' : 'password';

    return (
      <div className={'flex flex-col flex-1'}>
        <label
          htmlFor={name}
          className={cn('text-sm', {
            'text-red-500': error,
            'text-[--neutral-1000]': !error,
          })}
        >
          {label}
        </label>
        <div className={'relative w-full'}>
          <input
            type={type === 'password' ? showPasswordType : type}
            name={name}
            placeholder={placeholder || `กรอก${label}`}
            id={name}
            value={value}
            onChange={onChange}
            className={clsx(
              'border rounded-lg px-3 py-2 focus:outline-none focus:border-black h-[56px] w-full',
              InputClassName,
              {
                'pr-9': passwordWithIcon,
                'border-red-500': error,
                'border-[#E5E5E5]': !error,
              }
            )}
            ref={ref}
            {...InputProps}
          />
          {Icon ||
            (passwordWithIcon && (
              <div
                className={
                  'absolute right-3 top-1/2 transform -translate-y-1/2'
                }
              >
                {passwordWithIcon ? (
                  <div
                    className={'cursor-pointer'}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Eye size={20} color={'lightgray'} />
                    ) : (
                      <EyeOff size={20} color={'lightgray'} />
                    )}
                  </div>
                ) : (
                  Icon
                )}
              </div>
            ))}
        </div>
        {error && (
          <div className={'text-red-500 text-sm mt-1'}>{error.message}</div>
        )}
      </div>
    );
  }
);

TextBox.displayName = 'TextBox';
