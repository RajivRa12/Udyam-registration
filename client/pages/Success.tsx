import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface RegistrationData {
  step1: {
    aadhaarNumber: string;
    name: string;
    mobileNumber: string;
    email: string;
  };
  step2: {
    organizationType: string;
    panNumber: string;
    enterpriseName: string;
    socialCategory: string;
    gender: string;
    isPhysicallyHandicapped: boolean;
    hasITR: boolean;
    hasGSTIN: boolean;
    gstinNumber: string;
  };
  submittedAt: string;
}

const Success: React.FC = () => {
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [certificateNumber] = useState(() => {
    // Generate a dummy Udyam certificate number
    const timestamp = Date.now().toString().slice(-6);
    return `UDYAM-DL-05-${timestamp}`;
  });

  useEffect(() => {
    const savedData = localStorage.getItem('udyam_registration_data');
    if (!savedData) {
      navigate('/');
      return;
    }
    setRegistrationData(JSON.parse(savedData));
  }, [navigate]);

  const handleDownloadCertificate = () => {
    // In a real application, this would download the actual PDF certificate
    alert('Certificate download would start here. In a real application, this would generate and download a PDF certificate.');
  };

  const handleStartNew = () => {
    localStorage.removeItem('udyam_step1_data');
    localStorage.removeItem('udyam_registration_data');
    navigate('/');
  };

  if (!registrationData) {
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
              to="/" 
              className="text-government-blue hover:text-government-blue-dark transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Success Message */}
        <div className="bg-white rounded-lg shadow-md border border-government-gray-light">
          <div className="p-6 text-center">
            <div className="w-20 h-20 bg-government-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-government-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-government-green mb-2">
              Registration Successful!
            </h2>
            <p className="text-government-gray mb-6">
              Your Udyam registration has been completed successfully. Your certificate has been generated.
            </p>
            
            <div className="bg-government-blue/5 border border-government-blue/20 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-government-blue mb-2">Udyam Registration Number</h3>
              <p className="text-2xl font-bold text-government-blue tracking-wider">
                {certificateNumber}
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleDownloadCertificate}
                className="bg-government-blue hover:bg-government-blue-dark text-white py-3 px-6 rounded-md font-semibold transition-colors"
              >
                Download Certificate
              </Button>
              <Button
                onClick={handleStartNew}
                variant="outline"
                className="border-government-blue text-government-blue hover:bg-government-blue hover:text-white py-3 px-6 rounded-md font-semibold transition-colors"
              >
                New Registration
              </Button>
            </div>
          </div>
        </div>

        {/* Registration Details */}
        <div className="mt-6 bg-white rounded-lg shadow-md border border-government-gray-light">
          <div className="p-6 border-b border-government-gray-light">
            <h3 className="text-lg font-bold text-government-blue">Registration Details</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-government-gray mb-3">Personal Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-government-gray">Name:</span>
                    <span className="font-medium">{registrationData.step1.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-government-gray">Mobile:</span>
                    <span className="font-medium">+91 {registrationData.step1.mobileNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-government-gray">Email:</span>
                    <span className="font-medium">{registrationData.step1.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-government-gray">Aadhaar:</span>
                    <span className="font-medium">****-****-{registrationData.step1.aadhaarNumber.slice(-4)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-government-gray mb-3">Organization Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-government-gray">Type:</span>
                    <span className="font-medium capitalize">{registrationData.step2.organizationType.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-government-gray">PAN:</span>
                    <span className="font-medium">{registrationData.step2.panNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-government-gray">Enterprise:</span>
                    <span className="font-medium">{registrationData.step2.enterpriseName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-government-gray">Category:</span>
                    <span className="font-medium uppercase">{registrationData.step2.socialCategory}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-government-gray-light pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-government-gray">Registration Date:</span>
                <span className="font-medium">
                  {new Date(registrationData.submittedAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-2">What's Next?</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Your Udyam certificate has been sent to {registrationData.step1.email}</li>
            <li>• Keep your Udyam registration number safe for future reference</li>
            <li>• You can now apply for government schemes and benefits for MSMEs</li>
            <li>• Visit the official Udyam portal to access additional services</li>
          </ul>
        </div>

        {/* Support Information */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Need Help?</h4>
          <p className="text-sm text-blue-700 mb-2">
            For any queries or support, contact the Udyam Help Desk:
          </p>
          <div className="text-sm text-blue-700 space-y-1">
            <div>📞 Helpline: 1800-180-6763</div>
            <div>📧 Email: helpdesk-udyam@gov.in</div>
            <div>🌐 Website: udyamregistration.gov.in</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
