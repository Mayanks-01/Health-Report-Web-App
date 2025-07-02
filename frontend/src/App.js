import React, { useState } from 'react';
import './App.css';
import UploadForm from './components/UploadForm';
import DataTable from './components/DataTable';
import TrendChart from './components/TrendChart';

function App() {
  const [report, setReport] = useState(null);

  return (
    <div className="container">
      <h1>🧾 Health Report OCR</h1>

      {!report ? (
        <UploadForm onData={setReport} />
      ) : (
        <>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Patient Name:</strong> {report.patientName || 'N/A'}<br />
            <strong>Report Date:</strong> {report.reportDate || 'N/A'}
          </div>

          <DataTable data={report.parameters} />

          <TrendChart
            params={report.parameters?.slice(0, 3)?.map(p => p.parameter.toLowerCase()) || []}
          />
        </>
      )}
    </div>
  );
}

export default App;
