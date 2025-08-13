import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ className, label, error, helperText, required, options, placeholder, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-semibold text-government-gray">
            {label}
            {required && <span className="text-government-red ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            className={cn(
              "flex h-12 w-full rounded-md border-2 border-government-gray-light bg-white px-3 py-2 text-sm",
              "text-government-gray focus:outline-none focus:ring-2 focus:ring-government-blue focus:border-government-blue",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-government-red focus:ring-government-red focus:border-government-red",
              className
            )}
            ref={ref}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-5 w-5 text-government-gray" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
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

FormSelect.displayName = "FormSelect";

export { FormSelect };
