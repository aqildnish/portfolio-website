const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    // Here you would typically implement email sending logic
    // For now, we'll just send a success response
    res.json({ success: true, message: 'Message received!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 