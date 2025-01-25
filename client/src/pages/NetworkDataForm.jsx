import { useState } from 'react';
import axios from 'axios';
import '../styles/NetworkDataForm.css';

function NetworkDataForm() {
  const [features, setFeatures] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('random_forest'); // Default model

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Parse the JSON string into an object
      const inputData = JSON.parse(features);
  
      // Check if the input is an object with a "features" key
      if (!inputData || !Array.isArray(inputData.features)) {
        throw new Error('Please provide a valid JSON object with a "features" array.');
      }
  
      const featuresArray = inputData.features;
      console.log('Number of features:', featuresArray.length); // Log the length
  
      if (featuresArray.length !== 70) {
        throw new Error(`Please provide exactly 70 features. Received ${featuresArray.length}.`);
      }
  
      const payload = {
        model: selectedModel, // Pass the selected model to the backend
        features: featuresArray, // Use the parsed array
      };
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/model/detect`, payload);
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
      alert(`Invalid input: ${error.message}. Please provide a valid JSON object with a "features" array.`);
    }
    setLoading(false);
  };
  return (
    <div className="network-data-form">
      <h2>Network Intrusion Detection</h2>
      <form onSubmit={handleSubmit}>
        {/* Model Selection Dropdown */}
        <div className="form-group">
          <label htmlFor="model">Select Model:</label>
          <select
            id="model"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            <option value="random_forest" >Random Forest</option>
            <option value="xgboost" disabled>XGBoost</option>
            <option value="svm" disabled>SVM</option>
          </select>
        </div>

        {/* Textarea for JSON Input */}
        <div className="form-group">
          <label htmlFor="features">Features (JSON Array):</label>
          <textarea
  id="features"
  value={features}
  onChange={(e) => setFeatures(e.target.value)}
  placeholder={`{
  "features": [
    "Destination Port",
    "Flow Duration",
    "Total Fwd Packets",
    "Total Backward Packets",
    "Total Length of Fwd Packets",
    "Total Length of Bwd Packets",
    "Fwd Packet Length Max",
    "Fwd Packet Length Min",
    "Fwd Packet Length Mean",
    "Fwd Packet Length Std",
    "Bwd Packet Length Max",
    "Bwd Packet Length Min",
    "Bwd Packet Length Mean",
    "Bwd Packet Length Std",
    "Flow Bytes/s",
    "Flow Packets/s",
    "Flow IAT Mean",
    "Flow IAT Std",
    "Flow IAT Max",
    "Flow IAT Min",
    "Fwd IAT Total",
    "Fwd IAT Mean",
    "Fwd IAT Std",
    "Fwd IAT Max",
    "Fwd IAT Min",
    "Bwd IAT Total",
    "Bwd IAT Mean",
    "Bwd IAT Std",
    "Bwd IAT Max",
    "Bwd IAT Min",
    "Fwd PSH Flags",
    "Fwd URG Flags",
    "Fwd Header Length",
    "Bwd Header Length",
    "Fwd Packets/s",
    "Bwd Packets/s",
    "Min Packet Length",
    "Max Packet Length",
    "Packet Length Mean",
    "Packet Length Std",
    "Packet Length Variance",
    "FIN Flag Count",
    "SYN Flag Count",
    "RST Flag Count",
    "PSH Flag Count",
    "ACK Flag Count",
    "URG Flag Count",
    "CWE Flag Count",
    "ECE Flag Count",
    "Down/Up Ratio",
    "Average Packet Size",
    "Avg Fwd Segment Size",
    "Avg Bwd Segment Size",
    "Fwd Header Length.1",
    "Subflow Fwd Packets",
    "Subflow Fwd Bytes",
    "Subflow Bwd Packets",
    "Subflow Bwd Bytes",
    "Init_Win_bytes_forward",
    "Init_Win_bytes_backward",
    "act_data_pkt_fwd",
    "min_seg_size_forward",
    "Active Mean",
    "Active Std",
    "Active Max",
    "Active Min",
    "Idle Mean",
    "Idle Std",
    "Idle Max",
    "Idle Min"
  ]
}`}
  rows={15}
/>

        </div>

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Analyzing...' : 'Detect Intrusion'}
        </button>
      </form>

      {/* Results Section */}
      {result && (
        <div className="results">
          <h3>Detection Results:</h3>
          <p>Status: <span className="prediction">{result.prediction}</span></p>
          <div className="visualization">
            <img src={`${import.meta.env.VITE_BACKEND_URL}/python-scripts/${result.visualization}`} alt="Prediction Probabilities" />
          </div>
          <div className="probabilities">
            {Object.entries(result.probabilities).map(([label, value]) => (
              <div key={label} className="probability-item">
                <span>{label}:</span>
                <progress value={value} max="1"></progress>
                <span>{(value * 100).toFixed(2)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NetworkDataForm;