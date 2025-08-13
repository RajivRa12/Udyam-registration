import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface OtpInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  className?: string;
  error?: string;
  label?: string;
  disabled?: boolean;
}

const OtpInput = forwardRef<HTMLDivElement, OtpInputProps>(
  ({ length = 6, value = '', onChange, onComplete, className, error, label, disabled }, ref) => {
    const [digits, setDigits] = useState<string[]>(Array(length).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
      const newDigits = value.split('').slice(0, length);
      while (newDigits.length < length) {
        newDigits.push('');
      }
      setDigits(newDigits);
    }, [value, length]);

    const handleChange = (index: number, digit: string) => {
      if (disabled) return;
      
      // Only allow single digits
      if (digit.length > 1) {
        digit = digit.slice(-1);
      }
      
      if (!/^\d*$/.test(digit)) return;

      const newDigits = [...digits];
      newDigits[index] = digit;
      setDigits(newDigits);

      const newValue = newDigits.join('');
      onChange?.(newValue);

      // Auto-focus next input
      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // Call onComplete when all digits are filled
      if (newDigits.every(d => d !== '') && newDigits.length === length) {
        onComplete?.(newValue);
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      if (e.key === 'Backspace' && !digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      
      if (e.key === 'ArrowLeft' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      
      if (e.key === 'ArrowRight' && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      if (disabled) return;
      
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '');
      const newDigits = pastedData.split('').slice(0, length);
      
      while (newDigits.length < length) {
        newDigits.push('');
      }
      
      setDigits(newDigits);
      const newValue = newDigits.join('');
      onChange?.(newValue);
      
      if (newDigits.every(d => d !== '')) {
        onComplete?.(newValue);
      }
    };

    return (
      <div className={cn("w-full space-y-2", className)} ref={ref}>
        {label && (
          <label className="block text-sm font-semibold text-government-gray">
            {label}
          </label>
        )}
        <div className="flex gap-2 justify-center">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={disabled}
              className={cn(
                "w-12 h-12 text-center text-lg font-semibold rounded-md border-2 border-government-gray-light",
                "focus:outline-none focus:ring-2 focus:ring-government-blue focus:border-government-blue",
                "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
                error && "border-government-red focus:ring-government-red focus:border-government-red",
                digit && "border-government-blue"
              )}
            />
          ))}
        </div>
        {error && (
          <p className="text-sm text-government-red font-medium text-center">{error}</p>
        )}
      </div>
    );
  }
);

OtpInput.displayName = "OtpInput";

export { OtpInput };
