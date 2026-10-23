
import express from "express"

import cors from "cors"
import users from "./src/routes/users.js"
import recruiterRoute from "./src/routes/recruiter.routes.js"
import jobRoute from "./src/routes/job.routes.js"
import jobseekerRoute from "./src/routes/jobseeker.routes.js"

import productRoute from "./src/routes/product.routes.js"
//Importing for Test Code
import userst1 from "./src/routes/userst1.js"



//This initialization was used when in package.json, "type" : "commonjs". It is currently "type":"module" 
//const app = require('./src/app'); 
const app = express()

const port = process.env.PORT || 3000;

// Testing Middleware code to parse JSON bodies
app.use(express.json());

/*
//Temp Code
const productRouter2 = express.Router();
const router = express.Router();
*/


// Use the urlencoded middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Use built-in JSON middleware to parse JSON request bodies
app.use(express.json()); 

// Use CORS middleware (with default options, allowing all origins)
app.use(cors());
/*
// Or, configure specific options:
const corsOptions = {
    origin: 'http://localhost:3000', // Allow only requests from this origin
    methods: 'GET,POST,PUT,DELETE',             // Allow only GET and POST methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
};
app.use(cors(corsOptions));
*/

// Do not uncomment this line without understanding the implications.
//app.use(express.jason({ type: 'application/vnd.api+jason' }));


app.use('/recruiters', recruiterRoute);


app.use('/job', jobRoute);
app.use('/jobseeker', jobseekerRoute);

// Use the users router for all requests starting with '/users'
app.use('/users', userst1);

app.use((req, res, next) => {
    console.log('This middleware is running!');
    next(); // Crucial for moving to the next middleware/route
})

//Temp Code to test Router
app.use('/products', productRoute);

/*
productRoute.use((req, res, next) => {
    console.log('This Router is running!');
    next(); // Crucial for moving to the next middleware/route
})

productRoute.get('/products', (req, res) => {
    const userAgent = req.headers['user-agent']; // Accessing the 'User-Agent' header
    const method = req.method; // Accessing the method

    console.log('User-Agent:', userAgent);
    console.log('Authorization:', authorization);

    res.send('Headers logged!');
});
*/

app.get('/health', (req, res) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };

    const receivedData = req.body; // The parsed JSON data will be in req.body
    console.log('Received JSON data:', receivedData);

    res.status(200).json(healthcheck);
});

app.post('/health', (req, res) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };

    const receivedData = req.body; // The parsed JSON data will be in req.body
    console.log('Received JSON data:', receivedData);

    res.status(200).json(healthcheck);
});

/*
//trial code statement
app.post('/products', (req, res) => {
    console.log('server.js : Request body:', req.body); // Log the request body
    console.log('server.js : Request Method:', req.method); // Log the request body
    res.json({ message: 'server.js : Product Data received' }); // Send a response
});

//trial code statement
app.get('/products', (req, res) => {
    console.log('server.js : Request body:', req.body); // Log the request body
    console.log('server.js : Request Method:', req.method); // Log the request body
    res.json({ message: 'server.js : Request to get Product Data received' }); // Send a response
});
*/

/*
//trial code statement
app.post('/api/job', (req, res) => {
    console.log('server.js : Request body:', req.body); // Log the request body
    res.json({ message: 'server.js : Job Data received' }); // Send a response
});

//trial code statement
app.post('/api/recruiters', (req, res) => {
    console.log('server.js : Request body:', req.body); // Log the request body
    console.log('server.js : Request Method:', req.method); // Log the request body
    res.json({ message: 'server.js : Recruiter Data received' }); // Send a response
});

//trial code statement
app.get('/api/recruiters', (req, res) => {
    console.log('server.js : Request body:', req.body); // Log the request body
    console.log('server.js : Request Method:', req.method); // Log the request body
    res.json({ message: 'server.js : Request to get Recruiter Data received' }); // Send a response
});



*/

//trial code statement
app.get('/api', (req, res) => {
    console.log('server.js : req received at api ');
    res.status(200).send({
        "title": "Euro Jobs API Documentation",
        success: 'true',
        message: 'Welcome to Euro Jobs API',
        version: '1.0.0',

    });

});

// Test Code 
app.get('/api/users', (req, res) => {
    console.log('server.js : get request for /api/users received ');
    res.status(200).send(users); 
});

app.listen(port, () => {
    console.log('server.js: The application is listening on the port ', port);

});
