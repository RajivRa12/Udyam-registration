import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface Registration {
  id: string;
  udyamNumber: string;
  enterpriseName: string;
  organizationType: string;
  status: 'active' | 'pending' | 'rejected' | 'expired';
  registrationDate: string;
  validUntil: string;
  lastUpdated: string;
}

interface Grievance {
  id: string;
  ticketNumber: string;
  subject: string;
  category: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  submittedDate: string;
  lastUpdate: string;
}

// Mock data
const mockRegistrations: Registration[] = [
  {
    id: '1',
    udyamNumber: 'UDYAM-DL-05-123456',
    enterpriseName: 'Rajesh Kumar Enterprises',
    organizationType: 'Proprietorship',
    status: 'active',
    registrationDate: '2024-01-15',
    validUntil: '2029-01-15',
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    udyamNumber: 'UDYAM-MH-12-987654',
    enterpriseName: 'Tech Solutions Pvt Ltd',
    organizationType: 'Private Limited',
    status: 'pending',
    registrationDate: '2024-03-10',
    validUntil: '2029-03-10',
    lastUpdated: '2024-03-12'
  }
];

const mockGrievances: Grievance[] = [
  {
    id: '1',
    ticketNumber: 'GRV-123456',
    subject: 'Certificate download issue',
    category: 'Technical Problem',
    status: 'resolved',
    submittedDate: '2024-02-20',
    lastUpdate: '2024-02-25'
  },
  {
    id: '2',
    ticketNumber: 'GRV-789012',
    subject: 'Update enterprise address',
    category: 'Data Correction Request',
    status: 'in_progress',
    submittedDate: '2024-03-05',
    lastUpdate: '2024-03-08'
  }
];

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'registrations' | 'grievances' | 'profile'>('registrations');
  const [registrations] = useState<Registration[]>(mockRegistrations);
  const [grievances] = useState<Grievance[]>(mockGrievances);
  const [user] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    mobile: '+91 9876543210',
    aadhaar: '****-****-5678'
  });

  const getStatusBadge = (status: string, type: 'registration' | 'grievance' = 'registration') => {
    const registrationStyles = {
      active: 'bg-government-green/10 text-government-green border-government-green',
      pending: 'bg-government-orange/10 text-government-orange border-government-orange',
      rejected: 'bg-government-red/10 text-government-red border-government-red',
      expired: 'bg-government-gray/10 text-government-gray border-government-gray'
    };

    const grievanceStyles = {
      open: 'bg-government-blue/10 text-government-blue border-government-blue',
      in_progress: 'bg-government-orange/10 text-government-orange border-government-orange',
      resolved: 'bg-government-green/10 text-government-green border-government-green',
      closed: 'bg-government-gray/10 text-government-gray border-government-gray'
    };

    const styles = type === 'registration' ? registrationStyles : grievanceStyles;
    const label = status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${styles[status as keyof typeof styles]}`}>
        {label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-government-gray-light">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-government-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-government-blue">User Dashboard</h1>
                <p className="text-sm text-government-gray">Manage your registrations and grievances</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-government-gray">Welcome, {user.name}</span>
              <Link to="/" className="text-government-blue hover:text-government-blue-dark transition-colors">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md border border-government-gray-light p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-government-blue/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-government-blue" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-government-gray">Total Registrations</p>
                <p className="text-2xl font-bold text-government-blue">{registrations.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-government-gray-light p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-government-green/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-government-green" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-government-gray">Active Certificates</p>
                <p className="text-2xl font-bold text-government-green">
                  {registrations.filter(r => r.status === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-government-gray-light p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-government-orange/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-government-orange" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-government-gray">Open Grievances</p>
                <p className="text-2xl font-bold text-government-orange">
                  {grievances.filter(g => g.status === 'open' || g.status === 'in_progress').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-government-gray-light p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-government-gray/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-government-gray" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-government-gray">Last Activity</p>
                <p className="text-sm font-bold text-government-gray">
                  {new Date().toLocaleDateString('en-IN')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md border border-government-gray-light">
          {/* Tab Navigation */}
          <div className="border-b border-government-gray-light">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('registrations')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'registrations'
                    ? 'border-government-blue text-government-blue'
                    : 'border-transparent text-government-gray hover:text-government-blue hover:border-government-gray'
                }`}
              >
                My Registrations
              </button>
              <button
                onClick={() => setActiveTab('grievances')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'grievances'
                    ? 'border-government-blue text-government-blue'
                    : 'border-transparent text-government-gray hover:text-government-blue hover:border-government-gray'
                }`}
              >
                My Grievances
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'profile'
                    ? 'border-government-blue text-government-blue'
                    : 'border-transparent text-government-gray hover:text-government-blue hover:border-government-gray'
                }`}
              >
                Profile Settings
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'registrations' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-government-blue">My Registrations</h3>
                  <Link to="/step1">
                    <Button className="bg-government-blue hover:bg-government-blue-dark text-white">
                      New Registration
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {registrations.map((registration) => (
                    <div key={registration.id} className="border border-government-gray-light rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold text-government-blue">
                              {registration.udyamNumber}
                            </h4>
                            {getStatusBadge(registration.status)}
                          </div>
                          <p className="text-government-gray font-medium mb-1">{registration.enterpriseName}</p>
                          <p className="text-sm text-government-gray mb-2">{registration.organizationType}</p>
                          <div className="grid md:grid-cols-3 gap-4 text-sm text-government-gray">
                            <div>
                              <span className="font-medium">Registered:</span> {new Date(registration.registrationDate).toLocaleDateString('en-IN')}
                            </div>
                            <div>
                              <span className="font-medium">Valid Until:</span> {new Date(registration.validUntil).toLocaleDateString('en-IN')}
                            </div>
                            <div>
                              <span className="font-medium">Last Updated:</span> {new Date(registration.lastUpdated).toLocaleDateString('en-IN')}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button variant="outline" className="border-government-blue text-government-blue hover:bg-government-blue hover:text-white">
                            View
                          </Button>
                          {registration.status === 'active' && (
                            <Button className="bg-government-blue hover:bg-government-blue-dark text-white">
                              Download
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'grievances' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-government-blue">My Grievances</h3>
                  <Link to="/grievance">
                    <Button className="bg-government-orange hover:bg-government-orange text-white">
                      File New Grievance
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {grievances.map((grievance) => (
                    <div key={grievance.id} className="border border-government-gray-light rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold text-government-blue">
                              {grievance.ticketNumber}
                            </h4>
                            {getStatusBadge(grievance.status, 'grievance')}
                          </div>
                          <p className="text-government-gray font-medium mb-1">{grievance.subject}</p>
                          <p className="text-sm text-government-gray mb-2">{grievance.category}</p>
                          <div className="grid md:grid-cols-2 gap-4 text-sm text-government-gray">
                            <div>
                              <span className="font-medium">Submitted:</span> {new Date(grievance.submittedDate).toLocaleDateString('en-IN')}
                            </div>
                            <div>
                              <span className="font-medium">Last Update:</span> {new Date(grievance.lastUpdate).toLocaleDateString('en-IN')}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button variant="outline" className="border-government-blue text-government-blue hover:bg-government-blue hover:text-white">
                            Track
                          </Button>
                          <Button variant="outline" className="border-government-gray text-government-gray hover:bg-gray-50">
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h3 className="text-lg font-semibold text-government-blue mb-6">Profile Settings</h3>
                
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div className="border border-government-gray-light rounded-lg p-6">
                    <h4 className="font-semibold text-government-gray mb-4">Personal Information</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-government-gray">Full Name</label>
                        <p className="font-semibold">{user.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-government-gray">Email Address</label>
                        <p className="font-semibold">{user.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-government-gray">Mobile Number</label>
                        <p className="font-semibold">{user.mobile}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-government-gray">Aadhaar Number</label>
                        <p className="font-semibold">{user.aadhaar}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="mt-4 border-government-blue text-government-blue hover:bg-government-blue hover:text-white">
                      Edit Profile
                    </Button>
                  </div>

                  {/* Notification Preferences */}
                  <div className="border border-government-gray-light rounded-lg p-6">
                    <h4 className="font-semibold text-government-gray mb-4">Notification Preferences</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-government-blue rounded focus:ring-government-blue" />
                        <span className="text-government-gray">Email notifications for registration updates</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-government-blue rounded focus:ring-government-blue" />
                        <span className="text-government-gray">SMS notifications for important updates</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="w-4 h-4 text-government-blue rounded focus:ring-government-blue" />
                        <span className="text-government-gray">Newsletter and scheme updates</span>
                      </label>
                    </div>
                    <Button variant="outline" className="mt-4 border-government-blue text-government-blue hover:bg-government-blue hover:text-white">
                      Save Preferences
                    </Button>
                  </div>

                  {/* Security Settings */}
                  <div className="border border-government-gray-light rounded-lg p-6">
                    <h4 className="font-semibold text-government-gray mb-4">Security Settings</h4>
                    <div className="space-y-3">
                      <Button variant="outline" className="border-government-blue text-government-blue hover:bg-government-blue hover:text-white">
                        Change Password
                      </Button>
                      <Button variant="outline" className="border-government-gray text-government-gray hover:bg-gray-50">
                        Download Data
                      </Button>
                      <Button variant="outline" className="border-government-red text-government-red hover:bg-government-red hover:text-white">
                        Deactivate Account
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
