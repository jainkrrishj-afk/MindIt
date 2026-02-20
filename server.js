const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  // Change '*' to your specific frontend domain in production (e.g., 'https://emotional-ecosystem.onrender.com')
  // origin: 'https://your-deployed-app.com'
  origin: '*' 
}));
app.use(express.json());
// Serve static files from the React build
app.use(express.static(path.join(__dirname, 'dist')));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/emotional_ecosystem';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Report Schema
const reportSchema = new mongoose.Schema({
  incidentType: { type: String, required: true },
  date: { type: Date, required: true },
  safeNow: { type: Boolean, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Report = mongoose.model('Report', reportSchema);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Emotional Ecosystem API is running' });
});

// Initialize AI Client (Placeholder for OpenAI/Gemini)
// const { OpenAI } = require('openai');
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('User Message:', message);

    // --- AI INTEGRATION START ---
    // Example OpenAI call:
    // const completion = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: message }],
    //   model: "gpt-3.5-turbo",
    // });
    // const aiResponse = completion.choices[0].message.content;
    
    // Mock Response for now
    const aiResponse = `I understand you're feeling "${message}". I'm here to support you. (Mock AI Response)`;
    // --- AI INTEGRATION END ---

    res.json({
      response: aiResponse,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/report', async (req, res) => {
  try {
    const { incidentType, date, safeNow, description } = req.body;

    // Basic Validation
    if (!incidentType || !date || safeNow === undefined) {
      return res.status(400).json({ error: 'Missing required fields: incidentType, date, or safeNow' });
    }

    const newReport = new Report({
      incidentType,
      date,
      safeNow,
      description
    });

    await newReport.save();

    res.status(201).json({ message: 'Report submitted successfully', reportId: newReport._id });
  } catch (error) {
    console.error('Report Submission Error:', error);
    res.status(500).json({ error: 'Failed to submit report' });
  }
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});