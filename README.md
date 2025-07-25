# 🧾 Health Report OCR Web App

A simple, functional web application that allows users to upload lab reports (PDF/image), extract health data using OCR or text parsing, and visualize it in a user-friendly way.

---

## 🚀 Features

- 📤 **Report Upload**: Upload lab reports in **PDF or image** format.
- 🧠 **OCR/Text Extraction**: Extracts health parameters, values, units, and normal ranges using `tesseract.js` or `pdf-parse`.
- 📋 **Clean Table Display**: Parsed data is shown in a clean, responsive table.
- 📈 **Trend Visualization**: Simulates historical trend data for selected health parameters like `hemoglobin`, `glucose`, and `cholesterol`.
- 👤 **Patient Info**: Extracts and displays **Patient Name** and **Report Date**.
- ✅ **No external API keys** required. Secure and self-contained.

---

## 🛠️ Tech Stack

- **Frontend**: React, Recharts, Axios
- **Backend**: Node.js, Express
- **OCR**: `tesseract.js` (for image parsing)
- **PDF Parser**: `pdf-parse` (for PDF text extraction)
- **File Upload**: Multer

---

## 📷 Demo

![App Preview](preview.png)

---

## 📦 Setup Instructions

### Backend

cd backend
npm install
node index.js

### Frontend

cd frontend
npm install
npm start
