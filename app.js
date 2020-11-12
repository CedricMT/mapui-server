// Import the mongoose module
var mongoose = require('mongoose');

// Set up default mongoose connection
var dbName = 'mapuidbooo';
var mongoDB = 'mongodb://localhost:7017/' + dbName;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
var db = mongoose.connection;

// Handle db connection events
db.on('error', err => {
    console.error('MongoDB connection error: ' + err);
});

db.on('open', () => {
    console.log('Successfully connected to database: ' + dbName + '.');
});