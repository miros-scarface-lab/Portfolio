const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Ensure data and uploads directory exists
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'assets', 'uploads');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const PORTFOLIO_FILE = path.join(DATA_DIR, 'portfolio.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

// Helper to safely read JSON
function readJSON(file, fallback = {}) {
  try {
    if (fs.existsSync(file)) {
      const data = fs.readFileSync(file, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
  }
  return fallback;
}

// Helper to safely write JSON
function writeJSON(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing ${file}:`, err);
    return false;
  }
}

// API Routes
app.get('/api/portfolio', (req, res) => {
  const data = readJSON(PORTFOLIO_FILE, {});
  res.json(data);
});

app.post('/api/portfolio', (req, res) => {
  const updatedData = req.body;
  if (!updatedData || typeof updatedData !== 'object') {
    return res.status(400).json({ error: 'Invalid data format' });
  }
  const existingData = readJSON(PORTFOLIO_FILE, {});
  const mergedData = {
    ...existingData,
    ...updatedData
  };
  if (updatedData.settings) {
    mergedData.settings = { ...(existingData.settings || {}), ...updatedData.settings };
  }
  if (updatedData.profile) {
    mergedData.profile = { ...(existingData.profile || {}), ...updatedData.profile };
  }
  if (updatedData.personalDirectory) {
    mergedData.personalDirectory = { ...(existingData.personalDirectory || {}), ...updatedData.personalDirectory };
  }
  const success = writeJSON(PORTFOLIO_FILE, mergedData);
  if (success) {
    res.json({ success: true, message: 'Portfolio saved successfully', data: mergedData });
  } else {
    res.status(500).json({ error: 'Failed to write portfolio file' });
  }
});

app.get('/api/messages', (req, res) => {
  const messages = readJSON(MESSAGES_FILE, []);
  res.json(messages);
});

app.post('/api/messages', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' });
  }

  const messages = readJSON(MESSAGES_FILE, []);
  const newMessage = {
    id: 'msg-' + Date.now(),
    name,
    email,
    subject: subject || 'General Portfolio Dispatch',
    message,
    date: new Date().toISOString(),
    read: false,
    starred: false
  };

  messages.unshift(newMessage);
  writeJSON(MESSAGES_FILE, messages);
  res.status(201).json({ success: true, message: 'Message dispatched successfully', data: newMessage });
});

app.patch('/api/messages/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const messages = readJSON(MESSAGES_FILE, []);
  const index = messages.findIndex(m => m.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Message not found' });
  }

  messages[index] = { ...messages[index], ...updates };
  writeJSON(MESSAGES_FILE, messages);
  res.json({ success: true, data: messages[index] });
});

app.delete('/api/messages/:id', (req, res) => {
  const { id } = req.params;
  let messages = readJSON(MESSAGES_FILE, []);
  messages = messages.filter(m => m.id !== id);
  writeJSON(MESSAGES_FILE, messages);
  res.json({ success: true, message: 'Message deleted' });
});

// Image upload (base64)
app.post('/api/upload', (req, res) => {
  try {
    const { imageBase64, filename } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: 'No image provided' });
    }
    const matches = imageBase64.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
    if (!matches) {
      return res.status(400).json({ error: 'Invalid base64 image data' });
    }
    const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
    const safeName = (filename ? filename.replace(/[^a-zA-Z0-9_-]/g, '_') : 'upload_' + Date.now()) + '.' + ext;
    const filePath = path.join(UPLOADS_DIR, safeName);
    fs.writeFileSync(filePath, Buffer.from(matches[2], 'base64'));
    res.json({ success: true, url: `assets/uploads/${safeName}` });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Explicit clean page routes
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'about.html')));
app.get('/terminal', (req, res) => res.sendFile(path.join(__dirname, 'terminal.html')));
app.get('/projects', (req, res) => res.sendFile(path.join(__dirname, 'projects.html')));
app.get('/skills', (req, res) => res.sendFile(path.join(__dirname, 'skills.html')));
app.get('/academics', (req, res) => res.sendFile(path.join(__dirname, 'academics.html')));
app.get('/experience', (req, res) => res.sendFile(path.join(__dirname, 'experience.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'contact.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));

// Serve static frontend files
app.use(express.static(__dirname));

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`Vintage CSE Portfolio & Admin Panel is running!`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log(`Admin Panel: http://localhost:${PORT}#admin`);
  console.log(`=======================================================`);
});
