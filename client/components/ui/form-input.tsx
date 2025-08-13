import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  isValid?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, error, helperText, required, isValid, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-semibold text-government-gray">
            {label}
            {required && <span className="text-government-red ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            className={cn(
              "flex h-12 w-full rounded-md border-2 border-government-gray-light bg-white px-3 py-2 text-sm",
              "placeholder:text-government-gray focus:outline-none focus:ring-2 focus:ring-government-blue focus:border-government-blue",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-government-red focus:ring-government-red focus:border-government-red",
              isValid && "border-government-green focus:ring-government-green focus:border-government-green",
              className
            )}
            ref={ref}
            {...props}
          />
          {isValid && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-5 w-5 text-government-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-government-red font-medium">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-government-gray">{helperText}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput };
