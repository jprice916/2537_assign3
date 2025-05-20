const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

app.get('/hard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'hard.html'))
})
app.get('/normal', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'normal.html'))
})

// Catch-all route for 404s
app.use((req, res) => {
    res.status(404).send('Page not found - 404');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
