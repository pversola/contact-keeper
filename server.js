const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

// Connect Database
connectDB()

// Init Middleware
app.use(express.json({ extended: false }));

/*
// Remove production
app.get('/', (req, res) => 
    res.json({ msg: 'Welcome to the ContactKeeper API...' })
);
*/

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Server sttic asset in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server start on port ${PORT}`));