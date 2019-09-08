// Import packages
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// Import routes
const whiskies = require('./routes/api/whiskies');

// Bring in Express JS
const app = express();

// Bodyparser Middleware
app.use('/uploads/', express.static('uploads'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// DB Config
const db = require('./config/keys.js').mongoURILocal;

// Connect to Mongo
mongoose
	.connect(db, { useNewUrlParser: true, useCreateIndex: true })
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

// mongoose.set('useFindAndModify', false);

// Custom API routes
app.use('/api/whiskies', whiskies);

// Set static folder
app.use(express.static(path.join(__dirname, '../client/public')));

// Any request that doesn't match the above should be redirected to this
app.get('*', (req, res) => {
	console.log('Non-matching api request');
	res.sendFile(path.resolve(__dirname, '../client', 'public', 'index.html'));
});

// Serve static assets if in production (This is for Heroku deployment)
// if (process.env.NODE_ENV === 'production') {
// 	// Set static folder
// 	app.use(express.static('client/build'));

// 	// Catch all requests that doesn't match the above
// 	app.get('*', (req, res) => {
// 		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// 	})
// }

// Define a PORT variable, process.env.PORT is for Heroku deployment
const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.log('App is listening on port ' + PORT);
