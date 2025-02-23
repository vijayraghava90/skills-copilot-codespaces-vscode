// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.json());

// Read comments from file
function readComments() {
    try {
        const comments = fs.readFileSync('comments.json', 'utf8');
        return JSON.parse(comments);
    } catch (err) {
        return [];
    }
}

// Write comments to file
function writeComments(comments) {
    fs.writeFileSync('comments.json', JSON.stringify(comments, null, 2));
}

// Get all comments
app.get('/comments', (req, res) => {
    res.send(readComments());
});

// Add a new comment
app.post('/comments', (req, res) => {
    const comments = readComments();
    comments.push(req.body);
    writeComments(comments);
    res.send('Comment added!');
});

// Start server
app.listen(3000, () => {
    console.log('Server started');
});



