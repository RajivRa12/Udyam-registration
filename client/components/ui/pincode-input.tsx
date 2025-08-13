import React, { useState, useEffect, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { fetchPincodeData, type PincodeData } from '@/lib/pincode-api';

export interface PinCodeInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  onLocationData?: (data: PincodeData | null) => void;
  onChange?: (value: string) => void;
}

const PinCodeInput = forwardRef<HTMLInputElement, PinCodeInputProps>(
  ({ className, label, error, helperText, required, onLocationData, onChange, value, ...props }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [locationData, setLocationData] = useState<PincodeData | null>(null);
    const [localError, setLocalError] = useState<string>('');

    useEffect(() => {
      const fetchLocation = async () => {
        if (value && typeof value === 'string' && value.length === 6) {
          setIsLoading(true);
          setLocalError('');
          
          try {
            const result = await fetchPincodeData(value);
            
            if (result.success && result.data) {
              setLocationData(result.data);
              onLocationData?.(result.data);
            } else {
              setLocationData(null);
              onLocationData?.(null);
              setLocalError(result.error || 'PIN code not found');
            }
          } catch (err) {
            setLocationData(null);
            onLocationData?.(null);
            setLocalError('Failed to fetch location data');
          } finally {
            setIsLoading(false);
          }
        } else {
          setLocationData(null);
          onLocationData?.(null);
          setLocalError('');
        }
      };

      const timeoutId = setTimeout(fetchLocation, 500);
      return () => clearTimeout(timeoutId);
    }, [value, onLocationData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.replace(/\D/g, ''); // Only allow digits
      if (newValue.length <= 6) {
        onChange?.(newValue);
      }
    };

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
              locationData && "border-government-green focus:ring-government-green focus:border-government-green",
              className
            )}
            ref={ref}
            value={value}
            onChange={handleChange}
            maxLength={6}
            placeholder="Enter 6-digit PIN code"
            {...props}
          />
          {isLoading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="animate-spin h-5 w-5 text-government-blue" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          )}
          {locationData && !isLoading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-5 w-5 text-government-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Location Data Display */}
        {locationData && (
          <div className="bg-government-green/5 border border-government-green/20 rounded-md p-3">
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-government-gray">City:</span>
                <span className="font-medium text-government-green">{locationData.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-government-gray">State:</span>
                <span className="font-medium text-government-green">{locationData.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-government-gray">District:</span>
                <span className="font-medium text-government-green">{locationData.district}</span>
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <p className="text-sm text-government-red font-medium">{error}</p>
        )}
        {localError && !error && (
          <p className="text-sm text-government-orange font-medium">{localError}</p>
        )}
        {helperText && !error && !localError && (
          <p className="text-sm text-government-gray">{helperText}</p>
        )}
      </div>
    );
  }
);

PinCodeInput.displayName = "PinCodeInput";

export { PinCodeInput };
