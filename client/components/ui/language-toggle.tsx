import React from 'react';
import { useLanguage } from '@/lib/language-context';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ className }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={cn("flex items-center space-x-1 bg-white rounded-lg border border-government-gray-light p-1", className)}>
      <button
        onClick={() => setLanguage('en')}
        className={cn(
          "px-3 py-1 text-sm font-medium rounded-md transition-all duration-200",
          language === 'en'
            ? "bg-government-blue text-white shadow-sm"
            : "text-government-gray hover:text-government-blue hover:bg-gray-50"
        )}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('hi')}
        className={cn(
          "px-3 py-1 text-sm font-medium rounded-md transition-all duration-200",
          language === 'hi'
            ? "bg-government-blue text-white shadow-sm"
            : "text-government-gray hover:text-government-blue hover:bg-gray-50"
        )}
      >
        हिं
      </button>
    </div>
  );
};

export { LanguageToggle };
