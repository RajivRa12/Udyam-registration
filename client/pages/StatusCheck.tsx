import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormInput } from '@/components/ui/form-input';
import { Button } from '@/components/ui/button';

interface RegistrationStatus {
  udyamNumber: string;
  name: string;
  organizationType: string;
  status: 'active' | 'pending' | 'rejected' | 'expired';
  registrationDate: string;
  validUntil: string;
  panNumber: string;
  aadhaarLastFour: string;
  mobile: string;
  email: string;
}

// Mock data for demonstration
const mockRegistrations: Record<string, RegistrationStatus> = {
  'UDYAM-DL-05-123456': {
    udyamNumber: 'UDYAM-DL-05-123456',
    name: 'Rajesh Kumar',
    organizationType: 'Proprietorship',
    status: 'active',
    registrationDate: '2024-01-15',
    validUntil: '2029-01-15',
    panNumber: 'ABCDE1234F',
    aadhaarLastFour: '5678',
    mobile: '+91 9876543210',
    email: 'rajesh.kumar@example.com'
  },
  'UDYAM-MH-12-987654': {
    udyamNumber: 'UDYAM-MH-12-987654',
    name: 'Priya Sharma Enterprises',
    organizationType: 'Partnership',
    status: 'active',
    registrationDate: '2024-02-20',
    validUntil: '2029-02-20',
    panNumber: 'FGHIJ5678K',
    aadhaarLastFour: '9012',
    mobile: '+91 8765432109',
    email: 'priya.sharma@example.com'
  },
  'UDYAM-TN-08-456789': {
    udyamNumber: 'UDYAM-TN-08-456789',
    name: 'Tech Solutions Pvt Ltd',
    organizationType: 'Private Limited',
    status: 'pending',
    registrationDate: '2024-03-10',
    validUntil: '2029-03-10',
    panNumber: 'KLMNO9012P',
    aadhaarLastFour: '3456',
    mobile: '+91 7654321098',
    email: 'admin@techsolutions.com'
  }
};

const StatusCheck: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'udyam' | 'pan' | 'mobile'>('udyam');
  const [status, setStatus] = useState<RegistrationStatus | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a search value');
      return;
    }

    setIsLoading(true);
    setError('');
    setStatus(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Search logic based on type
      let found: RegistrationStatus | null = null;

      if (searchType === 'udyam') {
        found = mockRegistrations[searchQuery.toUpperCase()] || null;
      } else if (searchType === 'pan') {
        found = Object.values(mockRegistrations).find(reg => 
          reg.panNumber.toUpperCase() === searchQuery.toUpperCase()
        ) || null;
      } else if (searchType === 'mobile') {
        const normalizedQuery = searchQuery.replace(/\D/g, '').slice(-10);
        found = Object.values(mockRegistrations).find(reg => 
          reg.mobile.replace(/\D/g, '').slice(-10) === normalizedQuery
        ) || null;
      }

      if (found) {
        setStatus(found);
      } else {
        setError('No registration found with the provided details');
      }
    } catch (err) {
      setError('Failed to fetch registration status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-government-green/10 text-government-green border-government-green',
      pending: 'bg-government-orange/10 text-government-orange border-government-orange',
      rejected: 'bg-government-red/10 text-government-red border-government-red',
      expired: 'bg-government-gray/10 text-government-gray border-government-gray'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
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
                <h1 className="text-xl font-bold text-government-blue">Registration Status Check</h1>
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
        <div className="bg-white rounded-lg shadow-md border border-government-gray-light">
          <div className="p-6 border-b border-government-gray-light">
            <h2 className="text-2xl font-bold text-government-blue mb-2">
              Check Registration Status
            </h2>
            <p className="text-government-gray">
              Search for your Udyam registration using registration number, PAN, or mobile number.
            </p>
          </div>

          <div className="p-6 space-y-6">
            {/* Search Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-government-gray mb-3">
                Search by <span className="text-government-red">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => setSearchType('udyam')}
                  className={`p-3 border-2 rounded-lg text-center transition-all ${
                    searchType === 'udyam' 
                      ? 'border-government-blue bg-government-blue/5 text-government-blue' 
                      : 'border-government-gray-light text-government-gray hover:border-government-blue'
                  }`}
                >
                  <div className="font-semibold">Udyam Number</div>
                  <div className="text-xs">UDYAM-XX-XX-XXXXXX</div>
                </button>
                <button
                  onClick={() => setSearchType('pan')}
                  className={`p-3 border-2 rounded-lg text-center transition-all ${
                    searchType === 'pan' 
                      ? 'border-government-blue bg-government-blue/5 text-government-blue' 
                      : 'border-government-gray-light text-government-gray hover:border-government-blue'
                  }`}
                >
                  <div className="font-semibold">PAN Number</div>
                  <div className="text-xs">ABCDE1234F</div>
                </button>
                <button
                  onClick={() => setSearchType('mobile')}
                  className={`p-3 border-2 rounded-lg text-center transition-all ${
                    searchType === 'mobile' 
                      ? 'border-government-blue bg-government-blue/5 text-government-blue' 
                      : 'border-government-gray-light text-government-gray hover:border-government-blue'
                  }`}
                >
                  <div className="font-semibold">Mobile Number</div>
                  <div className="text-xs">9876543210</div>
                </button>
              </div>
            </div>

            {/* Search Input */}
            <FormInput
              label={`Enter ${searchType === 'udyam' ? 'Udyam Registration Number' : searchType === 'pan' ? 'PAN Number' : 'Mobile Number'}`}
              placeholder={
                searchType === 'udyam' ? 'Enter Udyam number (e.g., UDYAM-DL-05-123456)' :
                searchType === 'pan' ? 'Enter PAN number (e.g., ABCDE1234F)' :
                'Enter mobile number (e.g., 9876543210)'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              error={error}
              required
            />

            <Button
              onClick={handleSearch}
              disabled={isLoading || !searchQuery.trim()}
              className="w-full bg-government-blue hover:bg-government-blue-dark text-white py-3 px-6 rounded-md font-semibold transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Searching...' : 'Check Status'}
            </Button>
          </div>
        </div>

        {/* Status Result */}
        {status && (
          <div className="mt-6 bg-white rounded-lg shadow-md border border-government-gray-light">
            <div className="p-6 border-b border-government-gray-light">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-government-blue">Registration Details</h3>
                {getStatusBadge(status.status)}
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-semibold text-government-gray">Udyam Registration Number</label>
                    <p className="text-lg font-bold text-government-blue">{status.udyamNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-government-gray">Entrepreneur/Enterprise Name</label>
                    <p className="font-medium">{status.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-government-gray">Organization Type</label>
                    <p className="font-medium">{status.organizationType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-government-gray">PAN Number</label>
                    <p className="font-medium">{status.panNumber}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-semibold text-government-gray">Registration Date</label>
                    <p className="font-medium">{new Date(status.registrationDate).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-government-gray">Valid Until</label>
                    <p className="font-medium">{new Date(status.validUntil).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-government-gray">Mobile Number</label>
                    <p className="font-medium">{status.mobile}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-government-gray">Email</label>
                    <p className="font-medium">{status.email}</p>
                  </div>
                </div>
              </div>

              {status.status === 'active' && (
                <div className="mt-6 flex gap-4">
                  <Button className="bg-government-blue hover:bg-government-blue-dark text-white">
                    Download Certificate
                  </Button>
                  <Button variant="outline" className="border-government-blue text-government-blue hover:bg-government-blue hover:text-white">
                    Print Certificate
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sample Numbers for Testing */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Test with Sample Data:</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <div><strong>Udyam:</strong> UDYAM-DL-05-123456, UDYAM-MH-12-987654, UDYAM-TN-08-456789</div>
            <div><strong>PAN:</strong> ABCDE1234F, FGHIJ5678K, KLMNO9012P</div>
            <div><strong>Mobile:</strong> 9876543210, 8765432109, 7654321098</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCheck;
