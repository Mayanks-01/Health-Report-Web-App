import { useState } from 'react';
import axios from 'axios';

export default function UploadForm({ onData }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = e => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!file) {
      setError('Please select a PDF or image file.');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('report', file);
    try {
      const res = await axios.post('http://localhost:4000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onData(res.data); // pass extracted data up to parent
    } catch (err) {
      console.error(err);
      setError('Upload failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <input
        type="file"
        accept="application/pdf,image/*"
        onChange={handleFileChange}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading} style={{ marginTop: 10 }}>
        {loading ? 'Uploading…' : 'Upload Report'}
      </button>
    </form>
  );
}
