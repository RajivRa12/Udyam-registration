import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header and Navigation
    'app_title': 'Udyam Registration Portal',
    'ministry_subtitle': 'Ministry of Micro, Small & Medium Enterprises',
    'back_to_home': 'Back to Home',
    'help_faq': 'Help & FAQ',
    'verify_certificate': 'Verify Certificate',
    'statistics': 'Statistics',
    'dashboard': 'Dashboard',
    
    // Homepage
    'hero_title': 'Register Your MSME Business',
    'hero_subtitle': 'Get your Udyam Registration Certificate online in just a few simple steps. Unlock benefits, schemes, and opportunities for your micro, small, or medium enterprise.',
    'start_registration': 'Start New Registration',
    'check_status': 'Check Registration Status',
    'why_choose_title': 'Why Choose Udyam Registration?',
    'free_registration': 'Free Registration',
    'free_registration_desc': 'Complete online registration process with no fees. Get your certificate instantly.',
    'government_benefits': 'Government Benefits',
    'government_benefits_desc': 'Access to various government schemes, subsidies, and support programs.',
    'easy_process': 'Easy Process',
    'easy_process_desc': 'Simple 2-step process with Aadhaar-based verification for quick registration.',
    
    // Forms
    'required_field': 'Required field',
    'aadhaar_number': 'Aadhaar Number',
    'full_name': 'Full Name',
    'mobile_number': 'Mobile Number',
    'email_address': 'Email Address',
    'pan_number': 'PAN Number',
    'submit': 'Submit',
    'next': 'Next',
    'previous': 'Previous',
    'verify': 'Verify',
    'send_otp': 'Send OTP',
    'resend_otp': 'Resend OTP',
    'verify_otp': 'Verify OTP',
    
    // Status and Messages
    'success': 'Success',
    'error': 'Error',
    'loading': 'Loading...',
    'processing': 'Processing...',
    'completed': 'Completed',
    'pending': 'Pending',
    'active': 'Active',
    'invalid_input': 'Invalid input',
    'field_required': 'This field is required',
    
    // Footer
    'contact_info': 'Contact Information',
    'helpline': 'Helpline',
    'email_support': 'Email',
    'support_hours': 'Hours',
    'quick_links': 'Quick Links',
    'about_msme': 'About MSME',
    'copyright': '© 2024 Ministry of MSME, Government of India. All rights reserved.',
    
    // Common Actions
    'download': 'Download',
    'print': 'Print',
    'edit': 'Edit',
    'view': 'View',
    'delete': 'Delete',
    'save': 'Save',
    'cancel': 'Cancel',
    'close': 'Close',
    'search': 'Search',
    'filter': 'Filter',
    'sort': 'Sort',
    'export': 'Export'
  },
  hi: {
    // Header and Navigation
    'app_title': 'उद्यम पंजीकरण पोर्टल',
    'ministry_subtitle': 'सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय',
    'back_to_home': 'होम पर वापस',
    'help_faq': 'सहायता और FAQ',
    'verify_certificate': 'प्रमाणपत्र सत्यापित करें',
    'statistics': 'आंकड़े',
    'dashboard': 'डैशबोर्ड',
    
    // Homepage
    'hero_title': 'अपने MSME व्यवसाय क��� पंजीकरण कराएं',
    'hero_subtitle': 'कुछ सरल चरणों में ऑनलाइन अपना उद्यम पंजीकरण प्रमाणपत्र प्राप्त करें। अपने सूक्ष्म, लघु या मध्यम उद्यम के लिए लाभ, योजनाओं और अवसरों का लाभ उठाएं।',
    'start_registration': 'नया पंजीकरण शुरू करें',
    'check_status': 'पंजीकरण स्थिति जांचें',
    'why_choose_title': 'उद्यम पंजीकरण क्यों चुनें?',
    'free_registration': 'निःशुल्क पंजीकरण',
    'free_registration_desc': 'बिना किसी शुल्क के पूर्ण ऑनलाइन पंजीकरण प्रक्रिया। तुरंत अपना प्रमाणपत्र प्राप्त करें।',
    'government_benefits': 'सरकारी लाभ',
    'government_benefits_desc': 'विभिन्न सरकारी योजनाओं, सब्सिडी और सहायता कार्यक्रमों तक पहुंच।',
    'easy_process': 'आसान प्रक्रिया',
    'easy_process_desc': 'त्वरित पंजीकरण के लिए आधार-आधारित सत्यापन के साथ सरल 2-चरणीय प्रक्रिया।',
    
    // Forms
    'required_field': 'आवश्यक फ़ील्ड',
    'aadhaar_number': 'आधार संख्या',
    'full_name': 'पूरा नाम',
    'mobile_number': 'मोबाइल नंबर',
    'email_address': 'ईमेल पता',
    'pan_number': 'पैन नंबर',
    'submit': 'जमा करें',
    'next': 'अगला',
    'previous': 'पिछला',
    'verify': 'सत्यापित करें',
    'send_otp': 'OTP भेजें',
    'resend_otp': 'OTP पुनः भेजें',
    'verify_otp': 'OTP सत्यापित करें',
    
    // Status and Messages
    'success': 'सफलता',
    'error': 'त्रुटि',
    'loading': 'लोड हो रहा है...',
    'processing': 'प्रसंस्करण...',
    'completed': 'पूर्ण',
    'pending': 'लंबित',
    'active': 'सक्रिय',
    'invalid_input': 'अमान्य इनपुट',
    'field_required': 'यह ��़ील्ड आवश्यक है',
    
    // Footer
    'contact_info': 'संपर्क जानकारी',
    'helpline': 'हेल्पलाइन',
    'email_support': 'ईमेल',
    'support_hours': 'समय',
    'quick_links': 'त्वरित लिंक',
    'about_msme': 'MSME के बारे में',
    'copyright': '© 2024 MSME मंत्रालय, भारत सरकार। सभी अधिकार सुरक्षित।',
    
    // Common Actions
    'download': 'डाउनलोड',
    'print': 'प्रिंट',
    'edit': 'संपादित करें',
    'view': 'देखें',
    'delete': 'हटाएं',
    'save': 'सेव करें',
    'cancel': 'रद्द करें',
    'close': 'बंद करें',
    'search': 'खोजें',
    'filter': 'फिल्टर',
    'sort': 'क्रमबद्ध करें',
    'export': 'निर्यात'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
