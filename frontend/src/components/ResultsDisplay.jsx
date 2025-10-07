import React from 'react';

const ResultCard = ({ title, value, currency = false, suffix = '', tooltip }) => (
  <div className="bg-gray-50 rounded-xl p-6 text-center transform transition-transform duration-300 hover:scale-105 hover:bg-white hover:shadow-md">
    <h3 className="text-lg font-medium text-gray-500" title={tooltip}>{title}</h3>
    <p className={`text-4xl font-bold mt-2 ${value > 0 ? 'text-green-500' : 'text-gray-800'}`}>
      {currency && '₹'}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
    </p>
  </div>
);

const ReportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);


export default function ResultsDisplay({ results, onOpenReportModal }) {
  if (!results) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Results Will Appear Here</h2>
        <p className="text-gray-500">Fill out the form and click "Calculate Savings" to see your ROI potential.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl">
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Simulation Results</h2>
          <button 
            onClick={onOpenReportModal}
            className="flex items-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
              <ReportIcon/>
              Download Report
          </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ResultCard 
            title="Monthly Savings" 
            value={results.monthly_savings} 
            currency 
            tooltip="The estimated amount you save each month after switching to automation."
        />
        <ResultCard 
            title="Payback Period" 
            value={results.payback_months} 
            suffix=" months" 
            tooltip="How quickly the initial investment is paid back by the savings."
        />
        <ResultCard 
            title="ROI" 
            value={results.roi_percentage} 
            suffix=" %"
            tooltip="Total Return on Investment over your chosen time horizon."
        />
        <div className="md:col-span-3">
             <ResultCard 
                title="Total Net Savings" 
                value={results.net_savings} 
                currency 
                tooltip="Cumulative savings minus the one-time implementation cost over the time horizon."
            />
        </div>
      </div>
    </div>
  );
}
