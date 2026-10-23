/**
 * File: src/routes/job.routes.js
 * Description: File responsible for API routes for 
 *         'Job' class
 * 
 */

//const express = require('express'); ////export statement for commonjs based build or non-module based build
//const jobController = require('../controllers/job.controller');

import express from "express"
import jobController from "../controllers/job.controller.js"

const router = express.Router();

router.get('/job', (req, res) => {
    const userAgent = req.headers['user-agent']; // Accessing the 'User-Agent' header
    const authorization = req.headers['authorization']; // Accessing the 'Authorization' header

    console.log('User-Agent:', userAgent);
    console.log('Authorization:', authorization);

    res.send('Headers logged!');
});

// ==> Defining CRUD routes for 'Jobs':

// ==> Route responsible for creating new Job: (POST) localhost: 3000/api/job
router.post('/', jobController.createJob);

// ==> Route responsible for listing all jobs created: (GET) localhost: 3000/api/jobs
router.get('/', jobController.listAllJobs);

// ==> Route responsible for listing all jobs created: (GET) localhost: 3000/api/job
//router.get('/', jobController.listAllJobs);

// ==> Route responsible for fetching a job detail on the basis of Id. : (GET) localhost: 3000/api/job/:id
router.get('/:id', jobController.findJobById);

// ==> Route responsible for updating a job on the basis a specified Id. : (PUT) localhost: 3000/api/job/:id
router.put('/:id', jobController.updateJobById);

// ==> Route responsible for deleting a job on the basis of a specified Id. : (DELETE) localhost: 3000/api/job/:id
router.delete('/:id', jobController.deleteJobById);


// ==> Route responsible for creating new Job: (POST)
//localhost: 3000 / api / job
router.post('/', jobController.createJob);


export default router


//module.exports = router; //export statement for commonjs based build