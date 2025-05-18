const http = require('http');
const mongoose = require('mongoose');
const { URLSearchParams } = require('url');

const PORT = 3000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/signinDB'; // Change 'signinDB' to your preferred database name

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a Mongoose schema for users
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', userSchema);

// Create HTTP server
http.createServer(async (req, res) => {
    let data1 = '';

    // When data is received
    req.on('data', (chunk) => {
        data1 += chunk;
    });

    // When request ends, process the data
    req.on('end', async () => {
        const qs = new URLSearchParams(data1);
        const username = qs.get('username');
        const password = qs.get('password');

        try {
            const user = await User.findOne({ username, password });

            if (user) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end("Login successful!");
            } else {
                res.writeHead(401, { 'Content-Type': 'text/plain' });
                res.end("Login failed. Invalid credentials.");
            }
        } catch (error) {
            console.error('Database error:', error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end("Server error. Please try again later.");
        }
    });

}).listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
