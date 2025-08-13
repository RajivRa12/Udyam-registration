import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormInput } from '@/components/ui/form-input';
import { Button } from '@/components/ui/button';

interface CertificateData {
  udyamNumber: string;
  name: string;
  organizationType: string;
  address: string;
  state: string;
  district: string;
  pincode: string;
  mobile: string;
  email: string;
  panNumber: string;
  registrationDate: string;
  validUntil: string;
  majorActivity: string;
  nicCode: string;
  issuedBy: string;
  digitalSignature: string;
  qrCode: string;
  isValid: boolean;
}

// Mock certificate data
const mockCertificates: Record<string, CertificateData> = {
  'UDYAM-DL-05-123456': {
    udyamNumber: 'UDYAM-DL-05-123456',
    name: 'Rajesh Kumar',
    organizationType: 'Proprietorship',
    address: '123, Main Street, Connaught Place',
    state: 'Delhi',
    district: 'Central Delhi',
    pincode: '110001',
    mobile: '+91 9876543210',
    email: 'rajesh.kumar@example.com',
    panNumber: 'ABCDE1234F',
    registrationDate: '2024-01-15',
    validUntil: '2029-01-15',
    majorActivity: 'Manufacturing',
    nicCode: '13201',
    issuedBy: 'Ministry of MSME, Government of India',
    digitalSignature: 'DSC-MSME-2024-001',
    qrCode: 'QR123456789',
    isValid: true
  },
  'UDYAM-MH-12-987654': {
    udyamNumber: 'UDYAM-MH-12-987654',
    name: 'Priya Sharma Enterprises',
    organizationType: 'Partnership',
    address: '456, Business Park, Bandra Kurla Complex',
    state: 'Maharashtra',
    district: 'Mumbai',
    pincode: '400070',
    mobile: '+91 8765432109',
    email: 'priya.sharma@example.com',
    panNumber: 'FGHIJ5678K',
    registrationDate: '2024-02-20',
    validUntil: '2029-02-20',
    majorActivity: 'Services',
    nicCode: '62090',
    issuedBy: 'Ministry of MSME, Government of India',
    digitalSignature: 'DSC-MSME-2024-002',
    qrCode: 'QR987654321',
    isValid: true
  },
  'UDYAM-KA-08-456789': {
    udyamNumber: 'UDYAM-KA-08-456789',
    name: 'Tech Solutions Pvt Ltd',
    organizationType: 'Private Limited Company',
    address: '789, IT Park, Electronic City',
    state: 'Karnataka',
    district: 'Bangalore Urban',
    pincode: '560100',
    mobile: '+91 7654321098',
    email: 'admin@techsolutions.com',
    panNumber: 'KLMNO9012P',
    registrationDate: '2024-03-10',
    validUntil: '2029-03-10',
    majorActivity: 'Services',
    nicCode: '62011',
    issuedBy: 'Ministry of MSME, Government of India',
    digitalSignature: 'DSC-MSME-2024-003',
    qrCode: 'QR456789123',
    isValid: true
  }
};

const CertificateVerification: React.FC = () => {
  const [udyamNumber, setUdyamNumber] = useState('');
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    if (!udyamNumber.trim()) {
      setError('Please enter a Udyam Registration Number');
      return;
    }

    setIsLoading(true);
    setError('');
    setCertificateData(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const data = mockCertificates[udyamNumber.toUpperCase()];
      
      if (data) {
        setCertificateData(data);
      } else {
        setError('Certificate not found. Please check the Udyam Registration Number.');
      }
    } catch (err) {
      setError('Failed to verify certificate. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-government-gray-light print:hidden">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-government-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">✓</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-government-blue">Certificate Verification</h1>
                <p className="text-sm text-government-gray">Verify Udyam Registration Certificate</p>
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
        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md border border-government-gray-light print:hidden">
          <div className="p-6 border-b border-government-gray-light">
            <h2 className="text-2xl font-bold text-government-blue mb-2">
              Verify Certificate Authenticity
            </h2>
            <p className="text-government-gray">
              Enter the Udyam Registration Number to verify the authenticity of the certificate.
            </p>
          </div>

          <div className="p-6 space-y-6">
            <FormInput
              label="Udyam Registration Number"
              placeholder="Enter Udyam number (e.g., UDYAM-DL-05-123456)"
              value={udyamNumber}
              onChange={(e) => setUdyamNumber(e.target.value)}
              error={error}
              required
              helperText="Format: UDYAM-XX-XX-XXXXXX"
            />

            <Button
              onClick={handleVerify}
              disabled={isLoading || !udyamNumber.trim()}
              className="w-full bg-government-blue hover:bg-government-blue-dark text-white py-3 px-6 rounded-md font-semibold transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Verifying...' : 'Verify Certificate'}
            </Button>
          </div>
        </div>

        {/* Certificate Display */}
        {certificateData && (
          <div className="mt-6">
            {/* Print Header - Only visible when printing */}
            <div className="hidden print:block text-center mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <img src="/api/placeholder/60/60" alt="Government Logo" className="h-15 w-15" />
                <div>
                  <h1 className="text-2xl font-bold text-government-blue">Government of India</h1>
                  <h2 className="text-lg font-semibold text-government-gray">Ministry of Micro, Small & Medium Enterprises</h2>
                </div>
              </div>
            </div>

            {/* Certificate Content */}
            <div className="bg-white rounded-lg shadow-lg border-2 border-government-blue">
              {/* Certificate Header */}
              <div className="bg-government-blue text-white p-6 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">Udyam Registration Certificate</h3>
                    <p className="text-blue-100">Ministry of MSME, Government of India</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-blue-100">Certificate No.</div>
                    <div className="text-xl font-bold">{certificateData.udyamNumber}</div>
                  </div>
                </div>
              </div>

              {/* Verification Status */}
              <div className="p-4 bg-government-green/10 border-b border-government-green/20 print:hidden">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-government-green rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-government-green">Certificate Verified</div>
                    <div className="text-sm text-government-green/80">This certificate is authentic and valid</div>
                  </div>
                </div>
              </div>

              {/* Certificate Body */}
              <div className="p-8 space-y-6">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-government-gray mb-2">
                    This is to certify that
                  </h4>
                  <h3 className="text-2xl font-bold text-government-blue">
                    {certificateData.name}
                  </h3>
                  <p className="text-government-gray mt-2">
                    is registered as a <strong>{certificateData.organizationType}</strong> under the Udyam Registration
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid md:grid-cols-2 gap-6 border-t border-b border-government-gray-light py-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-government-gray uppercase tracking-wide">
                        Udyam Registration Number
                      </label>
                      <p className="text-lg font-bold text-government-blue">{certificateData.udyamNumber}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-semibold text-government-gray uppercase tracking-wide">
                        PAN Number
                      </label>
                      <p className="font-medium">{certificateData.panNumber}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-semibold text-government-gray uppercase tracking-wide">
                        Major Activity
                      </label>
                      <p className="font-medium">{certificateData.majorActivity}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-semibold text-government-gray uppercase tracking-wide">
                        NIC Code
                      </label>
                      <p className="font-medium">{certificateData.nicCode}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-government-gray uppercase tracking-wide">
                        Address
                      </label>
                      <p className="font-medium">
                        {certificateData.address}<br/>
                        {certificateData.district}, {certificateData.state} - {certificateData.pincode}
                      </p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-semibold text-government-gray uppercase tracking-wide">
                        Contact Details
                      </label>
                      <p className="font-medium">
                        Mobile: {certificateData.mobile}<br/>
                        Email: {certificateData.email}
                      </p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-semibold text-government-gray uppercase tracking-wide">
                        Registration Date
                      </label>
                      <p className="font-medium">{new Date(certificateData.registrationDate).toLocaleDateString('en-IN')}</p>
                    </div>
                  </div>
                </div>

                {/* Validity and Signatures */}
                <div className="flex justify-between items-end">
                  <div>
                    <label className="text-sm font-semibold text-government-gray uppercase tracking-wide">
                      Valid Until
                    </label>
                    <p className="text-lg font-bold text-government-green">
                      {new Date(certificateData.validUntil).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-government-gray">Digitally Signed By</div>
                    <div className="font-semibold text-government-blue">{certificateData.issuedBy}</div>
                    <div className="text-xs text-government-gray mt-1">
                      DSC: {certificateData.digitalSignature}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 p-4 rounded-b-lg">
                <div className="flex justify-between items-center text-sm text-government-gray">
                  <div>
                    This certificate can be verified at: udyamregistration.gov.in
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>QR Code:</span>
                    <div className="w-8 h-8 bg-government-blue/10 border border-government-blue/20 rounded flex items-center justify-center">
                      <span className="text-xs">QR</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-4 print:hidden">
              <Button
                onClick={handlePrint}
                className="bg-government-blue hover:bg-government-blue-dark text-white"
              >
                Print Certificate
              </Button>
              <Button
                variant="outline"
                className="border-government-blue text-government-blue hover:bg-government-blue hover:text-white"
              >
                Download PDF
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCertificateData(null);
                  setUdyamNumber('');
                }}
                className="border-government-gray text-government-gray hover:bg-gray-50"
              >
                Verify Another
              </Button>
            </div>
          </div>
        )}

        {/* Sample Numbers */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 print:hidden">
          <h4 className="font-semibold text-blue-800 mb-2">Test with Sample Udyam Numbers:</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <div><strong>UDYAM-DL-05-123456</strong> - Rajesh Kumar (Individual Proprietorship)</div>
            <div><strong>UDYAM-MH-12-987654</strong> - Priya Sharma Enterprises (Partnership)</div>
            <div><strong>UDYAM-KA-08-456789</strong> - Tech Solutions Pvt Ltd (Private Limited)</div>
          </div>
        </div>

        {/* Information Box */}
        <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-4 print:hidden">
          <h4 className="font-semibold text-orange-800 mb-2">About Certificate Verification:</h4>
          <ul className="text-sm text-orange-700 space-y-1">
            <li>• This verification system allows public access to check certificate authenticity</li>
            <li>• All Udyam certificates issued by the Government are verifiable through this system</li>
            <li>• Verified certificates show complete registration details for transparency</li>
            <li>• For any discrepancies, please contact the MSME helpline</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerification;
