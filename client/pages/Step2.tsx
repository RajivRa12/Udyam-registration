import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput } from '@/components/ui/form-input';
import { FormSelect } from '@/components/ui/form-select';
import { ProgressTracker } from '@/components/ui/progress-tracker';
import { Button } from '@/components/ui/button';

const PROGRESS_STEPS = [
  {
    id: 'step1',
    title: 'Aadhaar Verification',
    description: 'Verify your Aadhaar and mobile number'
  },
  {
    id: 'step2',
    title: 'PAN Verification',
    description: 'Verify PAN and organization details'
  }
];

const ORGANIZATION_TYPES = [
  { value: 'proprietorship', label: 'Proprietorship' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'huf', label: 'Hindu Undivided Family (HUF)' },
  { value: 'private_limited', label: 'Private Limited Company' },
  { value: 'llp', label: 'Limited Liability Partnership (LLP)' },
  { value: 'society', label: 'Society' },
  { value: 'trust', label: 'Trust' },
  { value: 'cooperative', label: 'Cooperative Society' }
];

const SOCIAL_CATEGORIES = [
  { value: 'general', label: 'General' },
  { value: 'sc', label: 'Scheduled Caste (SC)' },
  { value: 'st', label: 'Scheduled Tribe (ST)' },
  { value: 'obc', label: 'Other Backward Classes (OBC)' }
];

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' }
];

interface FormData {
  organizationType: string;
  panNumber: string;
  enterpriseName: string;
  socialCategory: string;
  gender: string;
  isPhysicallyHandicapped: boolean;
  hasITR: boolean;
  hasGSTIN: boolean;
  gstinNumber: string;
}

interface FormErrors {
  organizationType?: string;
  panNumber?: string;
  enterpriseName?: string;
  socialCategory?: string;
  gender?: string;
  gstinNumber?: string;
}

const Step2: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    organizationType: '',
    panNumber: '',
    enterpriseName: '',
    socialCategory: '',
    gender: '',
    isPhysicallyHandicapped: false,
    hasITR: false,
    hasGSTIN: false,
    gstinNumber: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [step1Data, setStep1Data] = useState<any>(null);

  useEffect(() => {
    // Get step 1 data from localStorage
    const savedData = localStorage.getItem('udyam_step1_data');
    if (!savedData) {
      navigate('/step1');
      return;
    }
    setStep1Data(JSON.parse(savedData));
  }, [navigate]);

  const validatePAN = (pan: string): boolean => {
    // PAN validation: [A-Za-z]{5}[0-9]{4}[A-Za-z]{1}
    const panRegex = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;
    return panRegex.test(pan);
  };

  const validateGSTIN = (gstin: string): boolean => {
    // GSTIN validation: 15 characters
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstinRegex.test(gstin);
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    // Clear GSTIN number if user says they don't have GSTIN
    if (field === 'hasGSTIN' && !value) {
      setFormData(prev => ({ ...prev, gstinNumber: '' }));
      setErrors(prev => ({ ...prev, gstinNumber: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.organizationType) {
      newErrors.organizationType = 'Organization type is required';
    }

    if (!formData.panNumber) {
      newErrors.panNumber = 'PAN number is required';
    } else if (!validatePAN(formData.panNumber)) {
      newErrors.panNumber = 'Please enter a valid PAN number (e.g., ABCDE1234F)';
    }

    if (!formData.enterpriseName.trim()) {
      newErrors.enterpriseName = 'Enterprise name is required';
    } else if (formData.enterpriseName.trim().length < 2) {
      newErrors.enterpriseName = 'Enterprise name must be at least 2 characters long';
    }

    if (!formData.socialCategory) {
      newErrors.socialCategory = 'Social category is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (formData.hasGSTIN && !formData.gstinNumber) {
      newErrors.gstinNumber = 'GSTIN number is required';
    } else if (formData.hasGSTIN && !validateGSTIN(formData.gstinNumber)) {
      newErrors.gstinNumber = 'Please enter a valid GSTIN number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call to verify PAN and submit data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const completeData = {
        step1: step1Data,
        step2: formData,
        submittedAt: new Date().toISOString()
      };
      
      localStorage.setItem('udyam_registration_data', JSON.stringify(completeData));
      navigate('/success');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!step1Data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-government-gray-light">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-government-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-government-blue">Udyam Registration</h1>
                <p className="text-sm text-government-gray">Ministry of MSME, Government of India</p>
              </div>
            </div>
            <Link 
              to="/step1" 
              className="text-government-blue hover:text-government-blue-dark transition-colors"
            >
              Back to Step 1
            </Link>
          </div>
        </div>
      </header>

      {/* Progress Tracker */}
      <div className="bg-white border-b border-government-gray-light">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <ProgressTracker
            steps={PROGRESS_STEPS}
            currentStep="step2"
            completedSteps={['step1']}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md border border-government-gray-light">
          <div className="p-6 border-b border-government-gray-light">
            <h2 className="text-2xl font-bold text-government-blue mb-2">
              PAN & Organization Details
            </h2>
            <p className="text-government-gray">
              Please provide your PAN and organization details to continue with the registration.
            </p>
          </div>

          <div className="p-6 space-y-6">
            <FormSelect
              label="Type of Organization"
              options={ORGANIZATION_TYPES}
              value={formData.organizationType}
              onChange={(e) => handleInputChange('organizationType', e.target.value)}
              error={errors.organizationType}
              required
              placeholder="Select organization type"
            />

            <FormInput
              label="PAN Number"
              placeholder="Enter PAN number (e.g., ABCDE1234F)"
              value={formData.panNumber}
              onChange={(e) => handleInputChange('panNumber', e.target.value.toUpperCase())}
              error={errors.panNumber}
              required
              maxLength={10}
              helperText="PAN format: 5 letters + 4 digits + 1 letter"
            />

            <FormInput
              label="Name of Enterprise as per PAN"
              placeholder="Enter enterprise name"
              value={formData.enterpriseName}
              onChange={(e) => handleInputChange('enterpriseName', e.target.value)}
              error={errors.enterpriseName}
              required
              helperText="Enter the name exactly as it appears on your PAN card"
            />

            <FormSelect
              label="Social Category"
              options={SOCIAL_CATEGORIES}
              value={formData.socialCategory}
              onChange={(e) => handleInputChange('socialCategory', e.target.value)}
              error={errors.socialCategory}
              required
              placeholder="Select social category"
            />

            <FormSelect
              label="Gender"
              options={GENDER_OPTIONS}
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              error={errors.gender}
              required
              placeholder="Select gender"
            />

            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.isPhysicallyHandicapped}
                  onChange={(e) => handleInputChange('isPhysicallyHandicapped', e.target.checked)}
                  className="w-4 h-4 text-government-blue bg-gray-100 border-gray-300 rounded focus:ring-government-blue"
                />
                <span className="text-sm font-medium text-government-gray">
                  Physically Handicapped (Divyangjan)
                </span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.hasITR}
                  onChange={(e) => handleInputChange('hasITR', e.target.checked)}
                  className="w-4 h-4 text-government-blue bg-gray-100 border-gray-300 rounded focus:ring-government-blue"
                />
                <span className="text-sm font-medium text-government-gray">
                  Income Tax Return (ITR) filed in previous year
                </span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.hasGSTIN}
                  onChange={(e) => handleInputChange('hasGSTIN', e.target.checked)}
                  className="w-4 h-4 text-government-blue bg-gray-100 border-gray-300 rounded focus:ring-government-blue"
                />
                <span className="text-sm font-medium text-government-gray">
                  Do you have GSTIN?
                </span>
              </label>
            </div>

            {formData.hasGSTIN && (
              <FormInput
                label="GSTIN Number"
                placeholder="Enter 15-digit GSTIN"
                value={formData.gstinNumber}
                onChange={(e) => handleInputChange('gstinNumber', e.target.value.toUpperCase())}
                error={errors.gstinNumber}
                required
                maxLength={15}
                helperText="GSTIN should be 15 characters long"
              />
            )}

            <div className="flex gap-4 pt-6">
              <Button
                onClick={() => navigate('/step1')}
                variant="outline"
                className="border-government-gray text-government-gray hover:bg-gray-50 py-3 px-6 rounded-md font-semibold transition-colors"
              >
                Previous Step
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 bg-government-blue hover:bg-government-blue-dark text-white py-3 px-6 rounded-md font-semibold transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Submitting...' : 'Submit Registration'}
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-3">Registration Summary:</h4>
          <div className="text-sm text-blue-700 space-y-2">
            <div className="flex justify-between">
              <span>Applicant Name:</span>
              <span className="font-medium">{step1Data.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Mobile Number:</span>
              <span className="font-medium">+91 {step1Data.mobileNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>Email:</span>
              <span className="font-medium">{step1Data.email}</span>
            </div>
            <div className="flex justify-between">
              <span>Aadhaar:</span>
              <span className="font-medium">****-****-{step1Data.aadhaarNumber.slice(-4)}</span>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h4 className="font-semibold text-orange-800 mb-2">Important Notes:</h4>
          <ul className="text-sm text-orange-700 space-y-1">
            <li>• Ensure your PAN details match exactly with your PAN card</li>
            <li>• GSTIN is optional but helps in faster processing</li>
            <li>• Double-check all information before submitting</li>
            <li>• You will receive your Udyam certificate via email after successful registration</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Step2;
