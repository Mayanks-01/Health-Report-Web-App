import React from 'react';

export default function DataTable({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No parameters found in this report.</p>;
  }

  return (
    <div style={{ overflowX: 'auto', maxWidth: '800px', margin: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>Parameter</th>
            <th style={thStyle}>Value</th>
            <th style={thStyle}>Unit</th>
            <th style={thStyle}>Normal Range</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} style={idx % 2 ? rowAltStyle : rowStyle}>
              <td style={tdStyle}>{row.parameter}</td>
              <td style={tdStyle}>{row.value}</td>
              <td style={tdStyle}>{row.unit}</td>
              <td style={tdStyle}>{row.range}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Simple inline styles (swap for Tailwind or CSS modules as desired)
const thStyle = {
  borderBottom: '2px solid #666',
  textAlign: 'left',
  padding: '8px',
};

const tdStyle = {
  borderBottom: '1px solid #ddd',
  padding: '8px',
};

const rowStyle = {
  backgroundColor: '#fff',
};

const rowAltStyle = {
  backgroundColor: '#f9f9f9',
};
