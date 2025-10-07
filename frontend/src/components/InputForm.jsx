import React from 'react';

export default function InputForm({ formData, setFormData, handleSimulate, handleSave, isSimulating }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Create a Simulation</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSimulate(); }} className="space-y-6">
        
        <div>
          <label htmlFor="scenario_name" className="block text-sm font-medium text-gray-700">
            Scenario Name
          </label>
          <input
            type="text"
            id="scenario_name"
            name="scenario_name"
            value={formData.scenario_name}
            onChange={handleChange}
            placeholder="e.g., Q4 Pilot Test"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="monthly_invoice_volume" className="block text-sm font-medium text-gray-700">Monthly Invoices</label>
            <input type="number" name="monthly_invoice_volume" id="monthly_invoice_volume" value={formData.monthly_invoice_volume} onChange={handleChange} placeholder="e.g., 2000" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="num_ap_staff" className="block text-sm font-medium text-gray-700">AP Staff Members</label>
            <input type="number" name="num_ap_staff" id="num_ap_staff" value={formData.num_ap_staff} onChange={handleChange} placeholder="e.g., 3" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
                <label htmlFor="avg_hours_per_invoice" className="block text-sm font-medium text-gray-700">Hours per Invoice</label>
                <input type="number" step="0.01" name="avg_hours_per_invoice" id="avg_hours_per_invoice" value={formData.avg_hours_per_invoice} onChange={handleChange} placeholder="e.g., 0.17 (10 mins)" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="hourly_wage" className="block text-sm font-medium text-gray-700">Average Hourly Wage (₹)</label>
                <input type="number" name="hourly_wage" id="hourly_wage" value={formData.hourly_wage} onChange={handleChange} placeholder="e.g., 30" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
                <label htmlFor="error_rate_manual" className="block text-sm font-medium text-gray-700">Manual Error Rate (₹)</label>
                <input type="number" step="0.1" name="error_rate_manual" id="error_rate_manual" value={formData.error_rate_manual} onChange={handleChange} placeholder="e.g., 0.5" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="error_cost" className="block text-sm font-medium text-gray-700">Cost per Error (₹)</label>
                <input type="number" name="error_cost" id="error_cost" value={formData.error_cost} onChange={handleChange} placeholder="e.g., 100" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
                <label htmlFor="time_horizon_months" className="block text-sm font-medium text-gray-700">Time Horizon (Months)</label>
                <input type="number" name="time_horizon_months" id="time_horizon_months" value={formData.time_horizon_months} onChange={handleChange} placeholder="e.g., 36" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="one_time_implementation_cost" className="block text-sm font-medium text-gray-700">Implementation Cost (₹)</label>
                <input type="number" name="one_time_implementation_cost" id="one_time_implementation_cost" value={formData.one_time_implementation_cost} onChange={handleChange} placeholder="e.g., 50000" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t mt-8">
            <button
              type="submit"
              disabled={isSimulating}
              className="w-full sm:w-auto flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
            >
              {isSimulating ? 'Calculating...' : 'Run Simulation'}
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSimulating}
              className="w-full sm:w-auto flex-1 inline-flex justify-center items-center px-6 py-3 border border-indigo-600 text-base font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSimulating ? 'Saving...' : 'Save Scenario'}
            </button>
        </div>
      </form>
    </div>
  );
}

