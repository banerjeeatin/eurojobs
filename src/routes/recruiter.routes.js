/**
 * File: src/routes/product.routes.js
 * Description: File responsible for API routes for 
 *         'Recruiter' class
 * 
 */

//const express = require('express'); ////export statement for commonjs based build or non-module based build
//const recruiterController = require('../controllers/recruiter.controller');

import express from "express"
import recruiterController from "../controllers/recruiter.controller.js"

const router = express.Router();

/*
router.get('/', (req, res) => {
    const userAgent = req.headers['user-agent']; // Accessing the 'User-Agent' header
    const authorization = req.headers['authorization']; //Accessing the 'Authorization' header
    const method = req.method; // Accessing the method

    console.log('User-Agent:', userAgent);
    console.log('Authorization:', authorization);

    res.send('Headers logged!');
});
*/



// ==> Defining CRUD routes for 'Recruiter':

// ==> Route responsible for creating new Recruiter: (POST) localhost: 3000/api/recruiters
router.post('/', recruiterController.createRecruiter);

// ==> Route responsible for listing all recruiters created: (GET) localhost: 3000/api/recruiters
router.get('/', recruiterController.listAllRecuiters);

// ==> Route responsible for fetching a recruiter company detail on the basis of Id. : (GET) localhost: 3000/api/recruiters/:id
router.get('/:id', recruiterController.findRecruiterById);

// ==> Route responsible for updating a recruiter company on the basis a specified Id. : (PUT) localhost: 3000/api/recruiters/:id
router.put('/:id', recruiterController.updateRecruiterById);

// ==> Route responsible for deleting a recruiter company on the basis of a specified Id. : (DELETE) localhost: 3000/api/recruiters/:id
router.delete('/:id', recruiterController.deleteRecruiterById);


// ==> Route responsible for creating new Recruiter: (POST)
//localhost: 3000 / api / recruiter
router.post('/', recruiterController.createRecruiter);


export default router
//export default recruiterRoute


//module.exports = router; //export statement for commonjs based build