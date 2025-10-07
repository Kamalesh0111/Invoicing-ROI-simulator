import React from 'react';

const LoadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 20h5v-5M20 4h-5v5" />
    </svg>
);

const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

export default function ScenarioManager({ scenarios, onLoad, onDelete }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Saved Scenarios</h2>
      {scenarios.length === 0 ? (
        <p className="text-gray-500 text-center py-4">You have no saved scenarios. Fill out the form and click "Save Scenario" to add one.</p>
      ) : (
        <div className="space-y-4">
          {scenarios.map((scenario) => (
            <div key={scenario.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200 transition-shadow duration-300 hover:shadow-md">
              <div>
                <p className="font-bold text-lg text-gray-800">{scenario.scenario_name}</p>
                <p className="text-sm text-gray-500">
                  Monthly Savings: <span className="font-semibold text-green-600">${scenario.monthly_savings.toLocaleString()}</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onLoad(scenario.id)}
                  className="flex items-center text-sm bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded-md hover:bg-blue-200 transition-colors duration-200"
                >
                  <LoadIcon /> Load
                </button>
                <button
                  onClick={() => onDelete(scenario.id)}
                  className="flex items-center text-sm bg-red-100 text-red-700 font-semibold py-2 px-4 rounded-md hover:bg-red-200 transition-colors duration-200"
                >
                  <DeleteIcon /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
