import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput } from '@/components/ui/form-input';
import { FormSelect } from '@/components/ui/form-select';
import { Button } from '@/components/ui/button';

const GRIEVANCE_CATEGORIES = [
  { value: 'registration_issue', label: 'Registration Related Issue' },
  { value: 'technical_problem', label: 'Technical Problem' },
  { value: 'certificate_issue', label: 'Certificate Download/Print Issue' },
  { value: 'data_correction', label: 'Data Correction Request' },
  { value: 'status_inquiry', label: 'Status Inquiry' },
  { value: 'payment_issue', label: 'Payment Related Issue' },
  { value: 'general_inquiry', label: 'General Inquiry' },
  { value: 'other', label: 'Other' }
];

const PRIORITY_LEVELS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' }
];

interface GrievanceForm {
  fullName: string;
  email: string;
  mobile: string;
  udyamNumber: string;
  category: string;
  priority: string;
  subject: string;
  description: string;
  attachments: File[];
}

interface FormErrors {
  [key: string]: string;
}

const Grievance: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<GrievanceForm>({
    fullName: '',
    email: '',
    mobile: '',
    udyamNumber: '',
    category: '',
    priority: 'medium',
    subject: '',
    description: '',
    attachments: []
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 10) {
      newErrors.subject = 'Subject must be at least 10 characters long';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof GrievanceForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      return validTypes.includes(file.type) && file.size <= maxSize;
    });

    if (validFiles.length !== files.length) {
      setErrors(prev => ({ 
        ...prev, 
        attachments: 'Some files were rejected. Only JPEG, PNG, PDF, and TXT files under 5MB are allowed.' 
      }));
    } else {
      setErrors(prev => ({ ...prev, attachments: '' }));
    }

    setFormData(prev => ({ ...prev, attachments: validFiles }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate ticket number
      const timestamp = Date.now().toString().slice(-6);
      const newTicketNumber = `GRV-${timestamp}`;
      setTicketNumber(newTicketNumber);
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        udyamNumber: '',
        category: '',
        priority: 'medium',
        subject: '',
        description: '',
        attachments: []
      });
    } catch (error) {
      setErrors({ submit: 'Failed to submit grievance. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-government-gray-light">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-government-green rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">✓</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-government-green">Grievance Submitted</h1>
                  <p className="text-sm text-government-gray">Your complaint has been registered</p>
                </div>
              </div>
              <Link to="/" className="text-government-blue hover:text-government-blue-dark transition-colors">
                Back to Home
              </Link>
            </div>
          </div>
        </header>

        {/* Success Content */}
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md border border-government-gray-light">
            <div className="p-6 text-center">
              <div className="w-20 h-20 bg-government-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-government-green" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-government-green mb-2">
                Grievance Submitted Successfully!
              </h2>
              <p className="text-government-gray mb-6">
                Your grievance has been registered and will be reviewed by our support team.
              </p>
              
              <div className="bg-government-green/5 border border-government-green/20 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-government-green mb-2">Ticket Number</h3>
                <p className="text-2xl font-bold text-government-green tracking-wider">
                  {ticketNumber}
                </p>
                <p className="text-sm text-government-gray mt-2">
                  Please save this ticket number for future reference
                </p>
              </div>

              <div className="space-y-4 text-left">
                <h4 className="font-semibold text-government-gray">What happens next?</h4>
                <ul className="text-sm text-government-gray space-y-2">
                  <li>• You will receive an email confirmation shortly</li>
                  <li>• Our support team will review your grievance within 24-48 hours</li>
                  <li>• You will be contacted via email or phone for any clarifications</li>
                  <li>• Expected resolution time: 3-7 working days</li>
                </ul>
              </div>

              <div className="flex gap-4 mt-6">
                <Button
                  onClick={() => setSubmitSuccess(false)}
                  className="bg-government-blue hover:bg-government-blue-dark text-white"
                >
                  Submit Another Grievance
                </Button>
                <Link to="/">
                  <Button variant="outline" className="border-government-blue text-government-blue hover:bg-government-blue hover:text-white">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-government-gray-light">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-government-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">!</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-government-blue">Grievance Portal</h1>
                <p className="text-sm text-government-gray">File a complaint or inquiry</p>
              </div>
            </div>
            <Link to="/" className="text-government-blue hover:text-government-blue-dark transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md border border-government-gray-light">
          <div className="p-6 border-b border-government-gray-light">
            <h2 className="text-2xl font-bold text-government-blue mb-2">
              Submit Your Grievance
            </h2>
            <p className="text-government-gray">
              Please provide detailed information about your issue. We will review and respond within 3-7 working days.
            </p>
          </div>

          <div className="p-6 space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-government-gray mb-4">Personal Information</h3>
              <div className="space-y-4">
                <FormInput
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  error={errors.fullName}
                  required
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormInput
                    label="Email Address"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={errors.email}
                    required
                  />

                  <FormInput
                    label="Mobile Number"
                    placeholder="Enter 10-digit mobile number"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    error={errors.mobile}
                    required
                    maxLength={10}
                  />
                </div>

                <FormInput
                  label="Udyam Registration Number"
                  placeholder="Enter Udyam number (if applicable)"
                  value={formData.udyamNumber}
                  onChange={(e) => handleInputChange('udyamNumber', e.target.value)}
                  helperText="Optional - if your grievance is related to a specific registration"
                />
              </div>
            </div>

            {/* Grievance Details */}
            <div>
              <h3 className="text-lg font-semibold text-government-gray mb-4">Grievance Details</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormSelect
                    label="Category"
                    options={GRIEVANCE_CATEGORIES}
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    error={errors.category}
                    required
                    placeholder="Select category"
                  />

                  <FormSelect
                    label="Priority"
                    options={PRIORITY_LEVELS}
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    required
                  />
                </div>

                <FormInput
                  label="Subject"
                  placeholder="Brief description of your issue"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  error={errors.subject}
                  required
                  helperText="Minimum 10 characters"
                />

                <div>
                  <label className="block text-sm font-semibold text-government-gray mb-2">
                    Description <span className="text-government-red">*</span>
                  </label>
                  <textarea
                    placeholder="Please provide detailed information about your issue..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border-2 border-government-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-government-blue focus:border-government-blue"
                  />
                  {errors.description && (
                    <p className="text-sm text-government-red font-medium mt-1">{errors.description}</p>
                  )}
                  <p className="text-sm text-government-gray mt-1">Minimum 20 characters</p>
                </div>
              </div>
            </div>

            {/* File Attachments */}
            <div>
              <h3 className="text-lg font-semibold text-government-gray mb-4">Attachments (Optional)</h3>
              <div>
                <label className="block text-sm font-semibold text-government-gray mb-2">
                  Upload Supporting Documents
                </label>
                <input
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.pdf,.txt"
                  onChange={handleFileUpload}
                  className="w-full px-3 py-2 border-2 border-government-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-government-blue focus:border-government-blue"
                />
                {errors.attachments && (
                  <p className="text-sm text-government-red font-medium mt-1">{errors.attachments}</p>
                )}
                <p className="text-sm text-government-gray mt-1">
                  Accepted formats: JPEG, PNG, PDF, TXT (Max 5MB per file)
                </p>
                
                {formData.attachments.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-semibold text-government-gray mb-2">Selected Files:</h4>
                    <ul className="space-y-1">
                      {formData.attachments.map((file, index) => (
                        <li key={index} className="text-sm text-government-blue flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          <span>{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {errors.submit && (
              <div className="bg-government-red/10 border border-government-red/20 rounded-lg p-4">
                <p className="text-government-red font-medium">{errors.submit}</p>
              </div>
            )}

            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-government-blue hover:bg-government-blue-dark text-white py-3 px-6 rounded-md font-semibold transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Grievance'}
            </Button>
          </div>
        </div>

        {/* Help Information */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Need Immediate Help?</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <div><strong>Helpline:</strong> 1800-180-6763 (10 AM - 6 PM, Mon-Fri)</div>
            <div><strong>Email:</strong> helpdesk-udyam@gov.in</div>
            <div><strong>Response Time:</strong> 3-7 working days for grievance resolution</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grievance;
