import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    category: 'Registration Process',
    question: 'What is Udyam Registration?',
    answer: 'Udyam Registration is a government registration process for Micro, Small, and Medium Enterprises (MSMEs) in India. It was introduced by the Ministry of MSME to replace the earlier system of filing Entrepreneurs Memorandum (EM-I & EM-II) and obtaining acknowledgement and Udyog Aadhaar Registration.'
  },
  {
    id: '2',
    category: 'Registration Process',
    question: 'Who can apply for Udyam Registration?',
    answer: 'Any Micro, Small and Medium Enterprise engaged in the production or manufacture of goods pertaining to any industry specified in the first schedule to the Industries Development and Regulation Act, 1951 or engaged in providing or rendering of services can apply for Udyam Registration.'
  },
  {
    id: '3',
    category: 'Registration Process',
    question: 'What documents are required for Udyam Registration?',
    answer: 'The following documents are required: 1) Aadhaar Card of the entrepreneur/authorized signatory, 2) PAN of the enterprise, 3) Mobile number linked to Aadhaar, 4) Email ID, 5) GSTIN (if applicable), 6) Bank details, 7) Enterprise details like address, commencement date, etc.'
  },
  {
    id: '4',
    category: 'Registration Process',
    question: 'Is there any fee for Udyam Registration?',
    answer: 'No, Udyam Registration is completely free of cost. The Government of India has made this registration process free to encourage small businesses to register and avail benefits.'
  },
  {
    id: '5',
    category: 'Registration Process',
    question: 'How long does it take to get Udyam Registration?',
    answer: 'Udyam Registration is issued instantly after successful submission of the application with all required details and verification of Aadhaar and PAN.'
  },
  {
    id: '6',
    category: 'Technical Issues',
    question: 'I am not receiving OTP on my mobile. What should I do?',
    answer: 'Please ensure that: 1) Your mobile number is linked to your Aadhaar card, 2) Your mobile network is working properly, 3) You have not blocked promotional SMS, 4) Wait for 2-3 minutes as sometimes there might be a delay. If the issue persists, try using the "Resend OTP" option.'
  },
  {
    id: '7',
    category: 'Technical Issues',
    question: 'My PAN details are not matching. What should I do?',
    answer: 'Please ensure that you enter the PAN number exactly as it appears on your PAN card. The name of the enterprise should also match the name mentioned in the PAN card. If there are still issues, please verify your PAN details with the Income Tax Department.'
  },
  {
    id: '8',
    category: 'Technical Issues',
    question: 'What should I do if my Aadhaar is not linked to my mobile number?',
    answer: 'You need to link your mobile number to Aadhaar first. You can do this by visiting the nearest Aadhaar center or by calling the Aadhaar helpline at 1947. Once linked, wait for 24-48 hours before attempting registration.'
  },
  {
    id: '9',
    category: 'After Registration',
    question: 'What are the benefits of Udyam Registration?',
    answer: 'Benefits include: 1) Priority in government tenders, 2) Easy access to credit and loans, 3) Subsidy benefits for various schemes, 4) Protection against delayed payments, 5) Technology upgradation support, 6) Marketing assistance, 7) Access to various government schemes.'
  },
  {
    id: '10',
    category: 'After Registration',
    question: 'How can I download my Udyam Certificate?',
    answer: 'You can download your Udyam Certificate by visiting the "Check Registration Status" page and entering your Udyam Registration Number, PAN, or registered mobile number. Once verified, you can download and print your certificate.'
  },
  {
    id: '11',
    category: 'After Registration',
    question: 'Can I update my information after registration?',
    answer: 'Yes, you can update certain information like address, bank details, and activity details. However, core information like Aadhaar number and PAN cannot be changed. For updates, you need to log in with your Udyam Registration Number.'
  },
  {
    id: '12',
    category: 'After Registration',
    question: 'What is the validity of Udyam Registration?',
    answer: 'Udyam Registration is valid for a lifetime unless the enterprise ceases to exist or the registration is cancelled for non-compliance. However, enterprises need to file Annual Returns to keep the registration active.'
  },
  {
    id: '13',
    category: 'General',
    question: 'What is the difference between Micro, Small, and Medium Enterprises?',
    answer: 'Classification based on investment and turnover: Micro - Investment up to ₹1 crore and turnover up to ₹5 crore; Small - Investment up to ₹10 crore and turnover up to ₹50 crore; Medium - Investment up to ₹50 crore and turnover up to ₹250 crore.'
  },
  {
    id: '14',
    category: 'General',
    question: 'Can I register multiple enterprises with the same Aadhaar?',
    answer: 'Yes, you can register multiple enterprises using the same Aadhaar number. Each enterprise will get a separate Udyam Registration Number. However, the person registering should be the owner/partner/director of all the enterprises.'
  },
  {
    id: '15',
    category: 'Support',
    question: 'What should I do if I face any issues during registration?',
    answer: 'If you face any technical issues, you can: 1) Contact the helpline at 1800-180-6763, 2) Email at helpdesk-udyam@gov.in, 3) Visit the nearest MSME Development Institute, 4) Use the grievance redressal system on the portal.'
  }
];

const categories = Array.from(new Set(faqData.map(item => item.category)));

const FAQ: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = faqData.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-government-gray-light">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-government-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">?</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-government-blue">Help & FAQ</h1>
                <p className="text-sm text-government-gray">Frequently Asked Questions</p>
              </div>
            </div>
            <Link 
              to="/" 
              className="text-government-blue hover:text-government-blue-dark transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md border border-government-gray-light p-6 mb-6">
          <h2 className="text-2xl font-bold text-government-blue mb-4">
            Frequently Asked Questions
          </h2>
          
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border-2 border-government-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-government-blue focus:border-government-blue"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-government-blue text-white border-government-blue'
                  : 'border-government-gray-light text-government-gray hover:border-government-blue'
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                  selectedCategory === category
                    ? 'bg-government-blue text-white border-government-blue'
                    : 'border-government-gray-light text-government-gray hover:border-government-blue'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="bg-white rounded-lg shadow-md border border-government-gray-light">
          <Accordion type="single" collapsible className="w-full">
            {filteredFAQs.map((faq, index) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-b border-government-gray-light last:border-b-0">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left">
                  <div className="flex items-start space-x-3 w-full">
                    <span className="flex-shrink-0 w-6 h-6 bg-government-blue text-white rounded-full text-sm font-bold flex items-center justify-center mt-1">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <span className="text-xs text-government-blue font-semibold uppercase tracking-wide">
                        {faq.category}
                      </span>
                      <h3 className="font-semibold text-government-gray mt-1">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="ml-9 text-government-gray leading-relaxed">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredFAQs.length === 0 && (
            <div className="p-8 text-center text-government-gray">
              <svg className="w-16 h-16 mx-auto mb-4 text-government-gray-light" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <p className="text-lg font-medium">No FAQs found</p>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md border border-government-gray-light p-6">
            <h3 className="text-lg font-bold text-government-blue mb-3">Need More Help?</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-government-blue/10 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-government-blue" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-government-gray">Helpline</div>
                  <div className="text-government-blue">1800-180-6763</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-government-blue/10 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-government-blue" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-government-gray">Email Support</div>
                  <div className="text-government-blue">helpdesk-udyam@gov.in</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-government-blue/10 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-government-blue" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-government-gray">Support Hours</div>
                  <div className="text-government-blue">10:00 AM - 6:00 PM (Mon-Fri)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-government-gray-light p-6">
            <h3 className="text-lg font-bold text-government-blue mb-3">Quick Links</h3>
            <div className="space-y-3">
              <Link to="/grievance" className="block text-government-blue hover:text-government-blue-dark transition-colors">
                → File a Grievance
              </Link>
              <Link to="/status-check" className="block text-government-blue hover:text-government-blue-dark transition-colors">
                → Check Registration Status
              </Link>
              <a href="#" className="block text-government-blue hover:text-government-blue-dark transition-colors">
                → Download Guidelines
              </a>
              <a href="#" className="block text-government-blue hover:text-government-blue-dark transition-colors">
                → Video Tutorials
              </a>
              <a href="#" className="block text-government-blue hover:text-government-blue-dark transition-colors">
                → Common Forms
              </a>
            </div>
          </div>
        </div>

        {/* Still Need Help */}
        <div className="mt-6 bg-government-blue/5 border border-government-blue/20 rounded-lg p-6 text-center">
          <h3 className="text-lg font-bold text-government-blue mb-2">Still Need Help?</h3>
          <p className="text-government-gray mb-4">
            Can't find what you're looking for? Our support team is here to help you with your Udyam registration.
          </p>
          <Link to="/grievance">
            <button className="bg-government-blue hover:bg-government-blue-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Contact Support
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
