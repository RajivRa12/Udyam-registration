import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface StatData {
  totalRegistrations: number;
  activeRegistrations: number;
  monthlyGrowth: number;
  yearlyGrowth: number;
  stateWiseData: Array<{
    state: string;
    count: number;
    percentage: number;
  }>;
  categoryWiseData: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;
  monthlyData: Array<{
    month: string;
    registrations: number;
  }>;
}

// Mock statistics data
const statisticsData: StatData = {
  totalRegistrations: 1247893,
  activeRegistrations: 1183456,
  monthlyGrowth: 8.5,
  yearlyGrowth: 42.3,
  stateWiseData: [
    { state: 'Uttar Pradesh', count: 187234, percentage: 15.0 },
    { state: 'Maharashtra', count: 156789, percentage: 12.6 },
    { state: 'Gujarat', count: 124567, percentage: 10.0 },
    { state: 'Tamil Nadu', count: 98765, percentage: 7.9 },
    { state: 'Karnataka', count: 89123, percentage: 7.1 },
    { state: 'Rajasthan', count: 76543, percentage: 6.1 },
    { state: 'West Bengal', count: 67890, percentage: 5.4 },
    { state: 'Madhya Pradesh', count: 65432, percentage: 5.2 },
    { state: 'Punjab', count: 54321, percentage: 4.4 },
    { state: 'Haryana', count: 45678, percentage: 3.7 }
  ],
  categoryWiseData: [
    { category: 'Micro Enterprise', count: 892345, percentage: 71.5 },
    { category: 'Small Enterprise', count: 267891, percentage: 21.5 },
    { category: 'Medium Enterprise', count: 87657, percentage: 7.0 }
  ],
  monthlyData: [
    { month: 'Apr 2024', registrations: 89123 },
    { month: 'May 2024', registrations: 95467 },
    { month: 'Jun 2024', registrations: 101234 },
    { month: 'Jul 2024', registrations: 98765 },
    { month: 'Aug 2024', registrations: 105432 },
    { month: 'Sep 2024', registrations: 112345 },
    { month: 'Oct 2024', registrations: 118901 },
    { month: 'Nov 2024', registrations: 125678 },
    { month: 'Dec 2024', registrations: 134567 }
  ]
};

const Statistics: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'states' | 'categories' | 'trends'>('overview');

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString('en-IN');
  };

  const getProgressBar = (percentage: number) => (
    <div className="w-full bg-government-gray-light rounded-full h-2">
      <div
        className="bg-government-blue h-2 rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-government-gray-light">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-government-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">📊</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-government-blue">Registration Statistics</h1>
                <p className="text-sm text-government-gray">Public dashboard of Udyam registrations</p>
              </div>
            </div>
            <Link to="/" className="text-government-blue hover:text-government-blue-dark transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Key Metrics */}
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
                <p className="text-2xl font-bold text-government-blue">
                  {statisticsData.totalRegistrations.toLocaleString('en-IN')}
                </p>
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
                  {statisticsData.activeRegistrations.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-government-gray-light p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-government-orange/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-government-orange" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-government-gray">Monthly Growth</p>
                <p className="text-2xl font-bold text-government-orange">
                  +{statisticsData.monthlyGrowth}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-government-gray-light p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-government-green/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-government-green" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-government-gray">Yearly Growth</p>
                <p className="text-2xl font-bold text-government-green">
                  +{statisticsData.yearlyGrowth}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow-md border border-government-gray-light">
          <div className="border-b border-government-gray-light">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setSelectedTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === 'overview'
                    ? 'border-government-blue text-government-blue'
                    : 'border-transparent text-government-gray hover:text-government-blue hover:border-government-gray'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setSelectedTab('states')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === 'states'
                    ? 'border-government-blue text-government-blue'
                    : 'border-transparent text-government-gray hover:text-government-blue hover:border-government-gray'
                }`}
              >
                State-wise Data
              </button>
              <button
                onClick={() => setSelectedTab('categories')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === 'categories'
                    ? 'border-government-blue text-government-blue'
                    : 'border-transparent text-government-gray hover:text-government-blue hover:border-government-gray'
                }`}
              >
                Enterprise Categories
              </button>
              <button
                onClick={() => setSelectedTab('trends')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === 'trends'
                    ? 'border-government-blue text-government-blue'
                    : 'border-transparent text-government-gray hover:text-government-blue hover:border-government-gray'
                }`}
              >
                Trends
              </button>
            </nav>
          </div>

          <div className="p-6">
            {selectedTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-government-blue mb-4">Registration Overview</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-government-gray mb-3">Top 5 States by Registrations</h4>
                      <div className="space-y-3">
                        {statisticsData.stateWiseData.slice(0, 5).map((state) => (
                          <div key={state.state} className="flex justify-between items-center">
                            <span className="text-government-gray">{state.state}</span>
                            <span className="font-semibold text-government-blue">
                              {formatNumber(state.count)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-government-gray mb-3">Enterprise Distribution</h4>
                      <div className="space-y-3">
                        {statisticsData.categoryWiseData.map((category) => (
                          <div key={category.category}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-government-gray">{category.category}</span>
                              <span className="font-semibold text-government-blue">
                                {category.percentage}%
                              </span>
                            </div>
                            {getProgressBar(category.percentage)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Key Insights</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Micro enterprises constitute {statisticsData.categoryWiseData[0].percentage}% of all registrations</li>
                    <li>• {statisticsData.stateWiseData[0].state} leads with {statisticsData.stateWiseData[0].percentage}% of total registrations</li>
                    <li>• Monthly registration growth rate is {statisticsData.monthlyGrowth}%</li>
                    <li>• {((statisticsData.activeRegistrations / statisticsData.totalRegistrations) * 100).toFixed(1)}% of registered enterprises maintain active status</li>
                  </ul>
                </div>
              </div>
            )}

            {selectedTab === 'states' && (
              <div>
                <h3 className="text-lg font-semibold text-government-blue mb-4">State-wise Registration Data</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-government-gray-light">
                        <th className="text-left py-3 px-4 font-semibold text-government-gray">Rank</th>
                        <th className="text-left py-3 px-4 font-semibold text-government-gray">State</th>
                        <th className="text-right py-3 px-4 font-semibold text-government-gray">Registrations</th>
                        <th className="text-right py-3 px-4 font-semibold text-government-gray">Percentage</th>
                        <th className="text-left py-3 px-4 font-semibold text-government-gray">Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {statisticsData.stateWiseData.map((state, index) => (
                        <tr key={state.state} className="border-b border-government-gray-light hover:bg-gray-50">
                          <td className="py-3 px-4 text-government-blue font-semibold">#{index + 1}</td>
                          <td className="py-3 px-4 text-government-gray">{state.state}</td>
                          <td className="py-3 px-4 text-right font-semibold text-government-blue">
                            {state.count.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3 px-4 text-right text-government-gray">{state.percentage}%</td>
                          <td className="py-3 px-4">
                            <div className="w-24">
                              {getProgressBar(state.percentage)}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedTab === 'categories' && (
              <div>
                <h3 className="text-lg font-semibold text-government-blue mb-4">Enterprise Category Distribution</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {statisticsData.categoryWiseData.map((category) => (
                    <div key={category.category} className="border border-government-gray-light rounded-lg p-6">
                      <div className="text-center">
                        <h4 className="font-semibold text-government-gray mb-2">{category.category}</h4>
                        <div className="text-3xl font-bold text-government-blue mb-2">
                          {formatNumber(category.count)}
                        </div>
                        <div className="text-lg text-government-green font-semibold">
                          {category.percentage}%
                        </div>
                        <div className="mt-4">
                          {getProgressBar(category.percentage)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Category Definitions</h4>
                  <div className="text-sm text-orange-700 space-y-1">
                    <div><strong>Micro Enterprise:</strong> Investment up to ₹1 crore and turnover up to ₹5 crore</div>
                    <div><strong>Small Enterprise:</strong> Investment up to ₹10 crore and turnover up to ₹50 crore</div>
                    <div><strong>Medium Enterprise:</strong> Investment up to ₹50 crore and turnover up to ₹250 crore</div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'trends' && (
              <div>
                <h3 className="text-lg font-semibold text-government-blue mb-4">Registration Trends</h3>
                
                {/* Simulated Chart */}
                <div className="border border-government-gray-light rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-government-gray mb-4">Monthly Registration Trend (2024)</h4>
                  <div className="space-y-3">
                    {statisticsData.monthlyData.map((month, index) => (
                      <div key={month.month} className="flex items-center space-x-4">
                        <div className="w-20 text-sm text-government-gray">{month.month}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <div 
                              className="bg-government-blue h-6 rounded transition-all duration-300"
                              style={{ 
                                width: `${(month.registrations / Math.max(...statisticsData.monthlyData.map(m => m.registrations))) * 100}%`,
                                minWidth: '20px'
                              }}
                            />
                            <span className="text-sm font-semibold text-government-blue">
                              {formatNumber(month.registrations)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Growth Highlights</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Consistent month-over-month growth throughout 2024</li>
                      <li>• Peak registration month: December 2024</li>
                      <li>• Average monthly registrations: {Math.round(statisticsData.monthlyData.reduce((sum, m) => sum + m.registrations, 0) / statisticsData.monthlyData.length).toLocaleString('en-IN')}</li>
                      <li>• Quarterly growth acceleration observed</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Future Projections</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Expected to reach 1.5M registrations by Q2 2025</li>
                      <li>• Continued growth in micro enterprise segment</li>
                      <li>• Technology sector showing highest growth rate</li>
                      <li>• Rural enterprise registrations increasing</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Data Sources */}
        <div className="mt-6 bg-gray-100 border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div>
              <strong>Data Sources:</strong> Ministry of MSME, Government of India | 
              <strong> Last Updated:</strong> {new Date().toLocaleDateString('en-IN')} | 
              <strong> Update Frequency:</strong> Daily
            </div>
            <div>
              <button className="text-government-blue hover:text-government-blue-dark transition-colors">
                Download Full Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
