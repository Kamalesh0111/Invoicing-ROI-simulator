import { Router } from 'express';
import { supabase } from './config/supabaseClient.js';

const router = Router();

// --- Internal Business Logic & Constants ---

const constants = {
  automated_cost_per_invoice: 0.20,
  error_rate_auto: 0.001, // 0.1%
  time_saved_per_invoice_minutes: 8,
  min_roi_boost_factor: 1.1,
};

const runSimulation = (inputs) => {
  const {
    monthly_invoice_volume,
    num_ap_staff,
    avg_hours_per_invoice,
    hourly_wage,
    error_rate_manual,
    error_cost,
    time_horizon_months,
    one_time_implementation_cost = 0 // Default to 0 if not provided
  } = inputs;

  // 1. Manual labor cost
  const labor_cost_manual = num_ap_staff * hourly_wage * avg_hours_per_invoice * monthly_invoice_volume;

  // 2. Automation cost
  const auto_cost = monthly_invoice_volume * constants.automated_cost_per_invoice;

  // 3. Error savings
  const manual_error_rate_decimal = error_rate_manual / 100;
  const error_savings = (manual_error_rate_decimal - constants.error_rate_auto) * monthly_invoice_volume * error_cost;

  // 4. Monthly savings (pre-bias)
  let monthly_savings = (labor_cost_manual + error_savings) - auto_cost;

  // 5. Apply bias factor
  monthly_savings = monthly_savings * constants.min_roi_boost_factor;

  // 6. Cumulative & ROI calculations
  const cumulative_savings = monthly_savings * time_horizon_months;
  const net_savings = cumulative_savings - one_time_implementation_cost;

  // FIX: Add check to prevent division by zero or negative savings
  const payback_months = (monthly_savings > 0 && one_time_implementation_cost > 0) 
    ? one_time_implementation_cost / monthly_savings 
    : 0;

  // FIX: Add check to prevent division by zero if implementation cost is 0
  const roi_percentage = one_time_implementation_cost > 0
    ? (net_savings / one_time_implementation_cost) * 100
    : 0;


  return {
    monthly_savings: parseFloat(monthly_savings.toFixed(2)),
    cumulative_savings: parseFloat(cumulative_savings.toFixed(2)),
    net_savings: parseFloat(net_savings.toFixed(2)),
    payback_months: parseFloat(payback_months.toFixed(2)),
    roi_percentage: parseFloat(roi_percentage.toFixed(2)),
  };
};


// --- API Endpoints ---

// POST /api/simulate - Run a simulation without saving
router.post('/simulate', (req, res) => {
  try {
    const results = runSimulation(req.body);
    res.status(200).json({ success: true, results });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error running simulation.', error: err.message });
  }
});

// POST /api/scenarios - Run a simulation AND save it to the database
router.post('/scenarios', async (req, res) => {
  try {
    const inputs = req.body;
    const results = runSimulation(inputs);

    const scenarioData = {
      ...inputs,
      ...results,
    };

    const { data, error } = await supabase
      .from('scenarios')
      .insert([scenarioData])
      .select();

    if (error) {
      // This will catch issues like a column name mismatch
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    res.status(201).json({ success: true, data: data[0] });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Error saving scenario.', error: err.message });
  }
});

// GET /api/scenarios - Retrieve all saved scenarios
router.get('/scenarios', async (req, res) => {
  try {
    // Re-added ordering to show newest scenarios first. This relies on the 'created_at' column.
    const { data, error } = await supabase.from('scenarios').select('*').order('created_at', { ascending: false });
    
    if (error) {
      console.error('Supabase error fetching scenarios:', error);
      throw new Error(error.message);
    }
    
    res.status(200).json(data);
  } catch (err) {
    // Added server-side logging for better debugging
    console.error('Error in GET /scenarios:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve scenarios.', error: err.message });
  }
});

// DELETE /api/scenarios/:id - Delete a specific scenario
router.delete('/scenarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('scenarios').delete().eq('id', id);
    if (error) throw new Error(error.message);
    res.status(200).json({ success: true, message: 'Scenario deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete scenario.', error: err.message });
  }
});

// Note: The /report/generate endpoint is not included as it's a frontend-only implementation for this project
// and doesn't require a dedicated backend endpoint based on our design.

export default router;

