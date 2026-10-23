/**
 * File: app.js
 * Description: File responsible for entire application configuration
 * 
 */
const express = require('express');
const cors = require('cors');


const app = express();

// Routes for API:
const index = require('./routes/index');
const jobRoute = require('./routes/job.routes');
const productRoute = require('./routes/product.routes');
const recruiterRoute = require('./routes/recruiter.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(express.jason({ type: 'application/vnd.api+jason' }));
app.use(cors());

app.use(index);
app.use('/api/', productRoute);
app.use('/api/', recruiterRoute);
app.use('/api/', jobRoute);

app.use(express.json());

//debug statement
app.post('/api/', (req, res) => {
    console.log('app.js : Request body:', req.body); // Log the request body
    res.json({ message: 'app.js : Data received' }); // Send a response
});


module.exports = app;