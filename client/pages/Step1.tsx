import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput } from '@/components/ui/form-input';
import { OtpInput } from '@/components/ui/otp-input';
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

interface FormData {
  aadhaarNumber: string;
  name: string;
  mobileNumber: string;
  email: string;
}

interface FormErrors {
  aadhaarNumber?: string;
  name?: string;
  mobileNumber?: string;
  email?: string;
  otp?: string;
}

const Step1: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    aadhaarNumber: '',
    name: '',
    mobileNumber: '',
    email: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const validateAadhaar = (aadhaar: string): boolean => {
    // Aadhaar validation: 12 digits, not all zeros
    const aadhaarRegex = /^\d{12}$/;
    return aadhaarRegex.test(aadhaar) && aadhaar !== '000000000000';
  };

  const validateMobile = (mobile: string): boolean => {
    // Indian mobile number validation
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.aadhaarNumber) {
      newErrors.aadhaarNumber = 'Aadhaar number is required';
    } else if (!validateAadhaar(formData.aadhaarNumber)) {
      newErrors.aadhaarNumber = 'Please enter a valid 12-digit Aadhaar number';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!validateMobile(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowOtpForm(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setErrors(prev => ({ ...prev, otp: 'Please enter a valid 6-digit OTP' }));
      return;
    }

    setIsVerifying(true);
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store step 1 data and navigate to step 2
      localStorage.setItem('udyam_step1_data', JSON.stringify(formData));
      navigate('/step2');
    } catch (error) {
      setErrors(prev => ({ ...prev, otp: 'Invalid OTP. Please try again.' }));
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    setOtp('');
    setErrors(prev => ({ ...prev, otp: undefined }));
    await handleSendOtp();
  };

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
              to="/" 
              className="text-government-blue hover:text-government-blue-dark transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Progress Tracker */}
      <div className="bg-white border-b border-government-gray-light">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <ProgressTracker
            steps={PROGRESS_STEPS}
            currentStep="step1"
            completedSteps={[]}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md border border-government-gray-light">
          <div className="p-6 border-b border-government-gray-light">
            <h2 className="text-2xl font-bold text-government-blue mb-2">
              Aadhaar Verification
            </h2>
            <p className="text-government-gray">
              Please provide your Aadhaar details for verification. An OTP will be sent to your registered mobile number.
            </p>
          </div>

          <div className="p-6 space-y-6">
            {!showOtpForm ? (
              <>
                <FormInput
                  label="Aadhaar Number"
                  placeholder="Enter 12-digit Aadhaar number"
                  value={formData.aadhaarNumber}
                  onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                  error={errors.aadhaarNumber}
                  required
                  maxLength={12}
                  helperText="Your Aadhaar number should be 12 digits"
                />

                <FormInput
                  label="Name of Entrepreneur"
                  placeholder="Enter name as per Aadhaar card"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  error={errors.name}
                  required
                  helperText="Enter your name exactly as it appears on your Aadhaar card"
                />

                <FormInput
                  label="Mobile Number"
                  placeholder="Enter 10-digit mobile number"
                  value={formData.mobileNumber}
                  onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                  error={errors.mobileNumber}
                  required
                  maxLength={10}
                  helperText="This should be the mobile number linked to your Aadhaar"
                />

                <FormInput
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={errors.email}
                  required
                  helperText="Your Udyam registration certificate will be sent to this email"
                />

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleSendOtp}
                    disabled={isLoading}
                    className="flex-1 bg-government-blue hover:bg-government-blue-dark text-white py-3 px-6 rounded-md font-semibold transition-colors"
                  >
                    {isLoading ? 'Sending OTP...' : 'Send OTP'}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-government-blue/10 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-government-blue" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-government-blue">OTP Sent!</h3>
                    <p className="text-government-gray">
                      A 6-digit OTP has been sent to +91 {formData.mobileNumber}
                    </p>
                  </div>
                </div>

                <OtpInput
                  label="Enter OTP"
                  value={otp}
                  onChange={setOtp}
                  onComplete={setOtp}
                  error={errors.otp}
                  length={6}
                />

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleVerifyOtp}
                    disabled={isVerifying || otp.length !== 6}
                    className="flex-1 bg-government-blue hover:bg-government-blue-dark text-white py-3 px-6 rounded-md font-semibold transition-colors disabled:opacity-50"
                  >
                    {isVerifying ? 'Verifying...' : 'Verify OTP'}
                  </Button>
                  <Button
                    onClick={handleResendOtp}
                    variant="outline"
                    className="border-government-blue text-government-blue hover:bg-government-blue hover:text-white py-3 px-6 rounded-md font-semibold transition-colors"
                  >
                    Resend OTP
                  </Button>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => setShowOtpForm(false)}
                    className="text-government-blue hover:text-government-blue-dark text-sm underline"
                  >
                    Edit Details
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Important Notes:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Ensure your mobile number is linked to your Aadhaar card</li>
            <li>• The OTP is valid for 10 minutes</li>
            <li>• Keep your Aadhaar card handy for reference</li>
            <li>• Use the same mobile number throughout the registration process</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Step1;
