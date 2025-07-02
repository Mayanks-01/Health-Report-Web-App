require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const pdf = require('pdf-parse');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// Flexible parser
function parseHealthData(text) {
  const lines = text.split('\n').map(l => l.trim());
  const results = [];
  let patientName = '';
  let reportDate = '';

  const regex = /([\w\s\(\)\-]+)\s*[:=→-]\s*([\d.]+)\s*([a-zA-Z\/%⁹µμ]+)?(?:.*?[(（]?\s*([\d.]+)\s*[-–—]\s*([\d.]+)\s*[)）]?)?/;

  lines.forEach(line => {
    if (!patientName) {
      const nameMatch = line.match(/(?:Patient\s*)?Name\s*[:=→-]\s*(.+)/i);
      if (nameMatch) patientName = nameMatch[1].trim();
    }

    if (!reportDate) {
      const dateMatch = line.match(/(?:Report\s*)?Date\s*[:=→-]?\s*([\d]{4}[\/\-][\d]{2}[\/\-][\d]{2})/i);
      if (dateMatch) reportDate = dateMatch[1].trim();
    }

    const m = line.match(regex);
    if (m && m[1] && m[2]) {
      let parameter = m[1].trim();
      if (parameter.includes('(')) {
        parameter = parameter.match(/\((.*?)\)/)?.[1] || parameter;
      }
      const value = parseFloat(m[2]);
      const unit = m[3] || '';
      const range = m[4] && m[5] ? `${m[4]}–${m[5]}` : '';
      results.push({ parameter, value, unit, range });
    }
  });

  return {
    patientName,
    reportDate,
    parameters: results,
  };
}

app.post('/api/upload', upload.single('report'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });

    let text = '';
    if (req.file.mimetype === 'application/pdf') {
      const data = await pdf(req.file.buffer);
      text = data.text;
    } else {
      const { data: { text: ocrText } } = await Tesseract.recognize(req.file.buffer, 'eng');
      text = ocrText;
    }

    const parsed = parseHealthData(text);
    res.json(parsed);
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to process report.' });
  }
});

const dummyTrends = {
  hemoglobin: [
    { date: '2025-01-01', value: 13.2 },
    { date: '2025-03-01', value: 13.8 },
    { date: '2025-06-01', value: 13.5 },
  ],
  glucose: [
    { date: '2025-01-01', value: 90 },
    { date: '2025-03-01', value: 95 },
    { date: '2025-06-01', value: 100 },
  ],
  cholesterol: [
    { date: '2025-01-01', value: 180 },
    { date: '2025-03-01', value: 190 },
    { date: '2025-06-01', value: 185 },
  ],
};

app.get('/api/trends', (req, res) => {
  const { params } = req.query;
  if (params) {
    const keys = params.split(',').map(k => k.toLowerCase());
    const filtered = {};
    keys.forEach(k => {
      if (dummyTrends[k]) filtered[k] = dummyTrends[k];
    });
    return res.json(filtered);
  }
  res.json(dummyTrends);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend listening on http://localhost:${PORT}`);
});
