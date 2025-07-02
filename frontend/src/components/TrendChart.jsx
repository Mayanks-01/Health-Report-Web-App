import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from 'recharts';

export default function TrendChart({ params = ['hemoglobin', 'glucose'] }) {
  

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 

    axios
      .get('http://localhost:4000/api/trends', {
        params: { params: params.join(',') },
      })
      .then(res => {

        setData(res.data);
      })
      .catch(err => {
        console.error('❌ API error:', err);
      })
      .finally(() => setLoading(false));
  }, [params]);

  if (loading) return <p>Loading trends...</p>;
  if (!data || Object.keys(data).length === 0)
    return <p>No trend data available.</p>;

  const dates = Array.from(
    new Set(Object.values(data).flatMap(arr => arr.map(pt => pt.date)))
  ).sort();

  const chartData = dates.map(date => {
    const point = { date };
    Object.keys(data).forEach(key => {
      const found = data[key].find(pt => pt.date === date);
      point[key] = found ? found.value : null;
    });
    return point;
  });

 

  return (
    <div style={{ width: '100%', maxWidth: 700, height: 400, margin: '20px auto' }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(data).map((key, idx) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={['#8884d8', '#82ca9d', '#ff7300'][idx % 3]}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
