import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { useLanguage } from '@/lib/language-context';

const Index: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-government-blue/5 to-government-orange/5">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-government-gray-light">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-government-blue rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">U</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-government-blue">{t('app_title')}</h1>
                  <p className="text-sm text-government-gray">{t('ministry_subtitle')}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex items-center space-x-4 text-sm">
                <Link to="/faq" className="text-government-blue hover:text-government-blue-dark transition-colors">
                  {t('help_faq')}
                </Link>
                <Link to="/verify-certificate" className="text-government-blue hover:text-government-blue-dark transition-colors">
                  {t('verify_certificate')}
                </Link>
                <Link to="/statistics" className="text-government-blue hover:text-government-blue-dark transition-colors">
                  {t('statistics')}
                </Link>
                <Link to="/dashboard" className="text-government-blue hover:text-government-blue-dark transition-colors">
                  {t('dashboard')}
                </Link>
              </nav>
              <LanguageToggle />
              <img src="/api/placeholder/80/40" alt="Government of India" className="h-10" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-government-blue mb-6">
            {t('hero_title')}
          </h2>
          <p className="text-xl text-government-gray mb-8 max-w-2xl mx-auto">
            {t('hero_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/step1">
              <Button className="bg-government-blue hover:bg-government-blue-dark text-white py-4 px-8 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                {t('start_registration')}
              </Button>
            </Link>
            <Link to="/status-check">
              <Button
                variant="outline"
                className="border-2 border-government-blue text-government-blue hover:bg-government-blue hover:text-white py-4 px-8 text-lg font-semibold rounded-lg transition-all duration-200"
              >
                {t('check_status')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-government-blue mb-12">
            Why Choose Udyam Registration?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-government-gray-light hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-government-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-government-blue" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-government-blue mb-3">Free Registration</h4>
              <p className="text-government-gray">
                Complete online registration process with no fees. Get your certificate instantly.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg border border-government-gray-light hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-government-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-government-green" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-government-blue mb-3">Government Benefits</h4>
              <p className="text-government-gray">
                Access to various government schemes, subsidies, and support programs.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg border border-government-gray-light hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-government-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-government-orange" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-government-blue mb-3">Easy Process</h4>
              <p className="text-government-gray">
                Simple 2-step process with Aadhaar-based verification for quick registration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-government-blue mb-12">
            Simple Registration Process
          </h3>
          <div className="space-y-8">
            <div className="flex items-center space-x-6 p-6 bg-white rounded-lg shadow-sm border border-government-gray-light">
              <div className="flex-shrink-0 w-12 h-12 bg-government-blue text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h4 className="text-xl font-semibold text-government-blue mb-2">Aadhaar Verification</h4>
                <p className="text-government-gray">
                  Enter your Aadhaar details and verify with OTP sent to your registered mobile number.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6 p-6 bg-white rounded-lg shadow-sm border border-government-gray-light">
              <div className="flex-shrink-0 w-12 h-12 bg-government-blue text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h4 className="text-xl font-semibold text-government-blue mb-2">PAN & Organization Details</h4>
                <p className="text-government-gray">
                  Provide your PAN information and organization details to complete the registration.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6 p-6 bg-white rounded-lg shadow-sm border border-government-gray-light">
              <div className="flex-shrink-0 w-12 h-12 bg-government-green text-white rounded-full flex items-center justify-center font-bold text-lg">
                ✓
              </div>
              <div>
                <h4 className="text-xl font-semibold text-government-blue mb-2">Get Your Certificate</h4>
                <p className="text-government-gray">
                  Receive your Udyam Registration Certificate instantly via email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Links */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-government-blue mb-8">
            Important Information
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 border border-government-gray-light rounded-lg">
              <h4 className="text-lg font-semibold text-government-blue mb-4">Required Documents</h4>
              <ul className="space-y-2 text-government-gray">
                <li>• Aadhaar Card</li>
                <li>• PAN Card</li>
                <li>• Mobile number linked to Aadhaar</li>
                <li>• Email ID</li>
                <li>• GSTIN (if applicable)</li>
              </ul>
            </div>

            <div className="p-6 border border-government-gray-light rounded-lg">
              <h4 className="text-lg font-semibold text-government-blue mb-4">Benefits of Registration</h4>
              <ul className="space-y-2 text-government-gray">
                <li>• Priority in government tenders</li>
                <li>• Easy access to credit and loans</li>
                <li>• Subsidy benefits</li>
                <li>• Protection against delayed payments</li>
                <li>• Technology upgradation support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-government-blue text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
              <div className="space-y-2 text-sm">
                <div>📞 Helpline: 1800-180-6763</div>
                <div>📧 Email: helpdesk-udyam@gov.in</div>
                <div>🕒 Hours: 10:00 AM - 6:00 PM (Mon-Fri)</div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <div><Link to="/status-check" className="hover:underline">Check Registration Status</Link></div>
                <div><Link to="/verify-certificate" className="hover:underline">Verify Certificate</Link></div>
                <div><Link to="/faq" className="hover:underline">Frequently Asked Questions</Link></div>
                <div><Link to="/grievance" className="hover:underline">Grievance Portal</Link></div>
                <div><Link to="/statistics" className="hover:underline">Registration Statistics</Link></div>
                <div><Link to="/dashboard" className="hover:underline">User Dashboard</Link></div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">About MSME</h4>
              <p className="text-sm">
                The Ministry of Micro, Small and Medium Enterprises is a branch of the Government of India 
                which is the apex body for the formulation and administration of rules and regulations.
              </p>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 Ministry of MSME, Government of India. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
