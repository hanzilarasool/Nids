const { spawn } = require('child_process');
const path = require('path');

exports.randomForestInference = (req, res) => {
  // Input Validation
  if (!req.body.features || !Array.isArray(req.body.features)) {
    return res.status(400).json({ error: 'Features must be provided as an array.' });
  }
  if (req.body.features.length !== 70) {
    return res.status(400).json({ error: 'Exactly 70 features are required.' });
  }
  for (const feature of req.body.features) {
    if (typeof feature !== 'number' || isNaN(feature)) {
      return res.status(400).json({ error: 'All features must be numbers.' });
    }
  }

  // Log the request
  console.log('Received features:', req.body.features);

  // Spawn Python process
  const python = spawn('python', [
    path.resolve(__dirname, '../python-scripts/random_forest_inference.py'),
    JSON.stringify(req.body.features) // Pass features as a JSON string
  ]);

  let result = '';
  let errorOutput = '';

  // Collect Python script output
  python.stdout.on('data', (data) => {
    result += data.toString();
  });

  // Collect Python script errors
  python.stderr.on('data', (data) => {
    errorOutput += data.toString();
    console.error(`Python Error: ${data.toString()}`);
  });

  // Handle Python process completion
  python.on('close', (code) => {
    if (code !== 0) {
      console.error(`Python process exited with code ${code}. Error: ${errorOutput}`);
      return res.status(500).json({ error: 'Model inference failed.', details: errorOutput });
    }

    try {
      const parsed = JSON.parse(result);
      if (parsed.error) {
        throw new Error(parsed.error);
      }
      // Log the result
      console.log('Model inference result:', parsed);
      res.json(parsed);
    } catch (e) {
      console.error('Error parsing Python script output:', e.message);
      res.status(500).json({ error: 'Failed to parse model output.', details: e.message });
    }
  });
};