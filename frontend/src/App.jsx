import React, { useState, useEffect } from 'react';
import InputForm from './components/InputForm.jsx';
import ResultsDisplay from './components/ResultsDisplay.jsx';
import ScenarioManager from './components/ScenarioManager.jsx';
import ReportModal from './components/ReportModal.jsx';

// Use environment variable for the API URL with a fallback for local development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const initialFormData = {
  scenario_name: '',
  monthly_invoice_volume: '',
  num_ap_staff: '',
  avg_hours_per_invoice: '',
  hourly_wage: '',
  error_rate_manual: '',
  error_cost: '',
  time_horizon_months: '',
  one_time_implementation_cost: '',
};

export default function App() {
  const [formData, setFormData] = useState(initialFormData);
  const [results, setResults] = useState(null);
  const [scenarios, setScenarios] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  // Fetch all saved scenarios when the component loads
  useEffect(() => {
    fetchScenarios();
  }, []);

  const fetchScenarios = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/scenarios`);
      if (!response.ok) throw new Error('Failed to fetch scenarios');
      const data = await response.json();
      setScenarios(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSimulate = async () => {
    setIsSimulating(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Simulation failed');
      const data = await response.json();
      setResults(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSimulating(false);
    }
  };

  const handleSave = async () => {
    if (!formData.scenario_name) {
      setError('Please enter a name for the scenario before saving.');
      return;
    }
    setIsSimulating(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/scenarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to save scenario');
      await response.json();
      await fetchScenarios(); // Refresh the list of scenarios
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSimulating(false);
    }
  };

  const handleLoad = (id) => {
    try {
        const scenarioToLoad = scenarios.find(s => s.id === id);
        if (scenarioToLoad) {
            // Separate results from the form data
            const { monthly_savings, cumulative_savings, net_savings, payback_months, roi_percentage, created_at, id: scenarioId, ...loadedFormData } = scenarioToLoad;
            setFormData(loadedFormData);
            setResults({ monthly_savings, cumulative_savings, net_savings, payback_months, roi_percentage });
        } else {
             throw new Error('Scenario not found');
        }
    } catch (err) {
        setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/scenarios/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete scenario');
      await fetchScenarios(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleGenerateReport = (email) => {
    // This function simulates the report download as an HTML file
    console.log(`Generating report for ${email}`);
    
    const reportHTML = `
      <html>
        <head>
          <title>ROI Report for ${formData.scenario_name}</title>
          <style>
            body { font-family: sans-serif; margin: 40px; }
            h1 { color: #333; }
            .card { border: 1px solid #eee; padding: 20px; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          </style>
        </head>
        <body>
          <h1>Invoice Automation ROI Report</h1>
          <h2>Scenario: ${formData.scenario_name}</h2>
          <div class="card">
            <h3>Monthly Savings</h3>
            <p>$${results.monthly_savings.toLocaleString()}</p>
          </div>
          <div class="card">
            <h3>Payback Period</h3>
            <p>${results.payback_months} months</p>
          </div>
           <div class="card">
            <h3>Return on Investment (ROI)</h3>
            <p>${results.roi_percentage}%</p>
          </div>
          <div class="card">
            <h3>Total Net Savings</h3>
            <p>$${results.net_savings.toLocaleString()}</p>
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([reportHTML], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `ROI_Report_${formData.scenario_name.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsModalOpen(false); // Close modal after generating
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Invoice Automation <span className="text-indigo-600">ROI Genie</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Visualize cost savings and payback when switching to automated invoicing.
          </p>
        </header>
        
        {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6" role="alert">
                <p className="font-bold">Error</p>
                <p>{error}</p>
            </div>
        )}

        <main className="flex flex-col lg:flex-row gap-8">
          <section className="lg:w-1/2">
            <InputForm
              formData={formData}
              setFormData={setFormData}
              handleSimulate={handleSimulate}
              handleSave={handleSave}
              isSimulating={isSimulating}
            />
          </section>
          <section className="lg:w-1/2 flex flex-col gap-8">
             <ResultsDisplay results={results} onOpenReportModal={() => setIsModalOpen(true)} />
             <ScenarioManager scenarios={scenarios} onLoad={handleLoad} onDelete={handleDelete} />
          </section>
        </main>

        <ReportModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onGenerateReport={handleGenerateReport}
        />
      </div>
    </div>
  );
}

