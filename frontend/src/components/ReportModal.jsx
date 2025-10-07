import React, { useState } from 'react';

export default function ReportModal({ isOpen, onClose, onGenerateReport }) {
  const [email, setEmail] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = () => {
    if (email) {
      onGenerateReport(email);
    }
  };

  return (
    // Backdrop
    <div 
      onClick={onClose} 
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center transition-opacity duration-300"
    >
      {/* Modal Card */}
      <div
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
        className="bg-white rounded-2xl shadow-2xl p-8 m-4 w-full max-w-md transform transition-transform duration-300 scale-95"
        style={{ animation: 'scaleUp 0.3s forwards' }}
      >
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Download Full Report</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
        </div>
        <p className="text-gray-600 mb-6">
          To receive a detailed PDF of your ROI analysis, please enter your email address below.
        </p>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Your Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!email}
          className="w-full mt-6 bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:bg-gray-300"
        >
          Generate & Download
        </button>
      </div>
      <style>{`
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
