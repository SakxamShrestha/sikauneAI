const express = require('express');
const cors = require('cors');
require('dotenv').config();

const chatRoutes = require('./routes/chat');
const threadRoutes = require('./routes/threads');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/threads', threadRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI Assistant Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});