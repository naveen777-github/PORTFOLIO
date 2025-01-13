const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Download Resume Endpoint
app.get('/download-resume', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'assets', 'RESUME.pdf'); // Correct file path
    console.log('Resolved file path:', filePath);

    // Ensure correct MIME type
    res.setHeader('Content-Type', 'application/pdf');

    res.download(filePath, 'NAVEEN_RAYAPUDI_RESUME.pdf', (err) => {
        if (err) {
            console.error('Error while downloading the file:', err.message);
            res.status(500).send('File download failed.');
        }
    });
});

// Default Home Route
app.get('/', (req, res) => {
    res.send(`
        <html>
            <body>
                <h1>Welcome to My Portfolio</h1>
                <a href="/download-resume" class="btn-primary" style="margin-top: 20px;">Download Resume</a>
            </body>
        </html>
    `);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
