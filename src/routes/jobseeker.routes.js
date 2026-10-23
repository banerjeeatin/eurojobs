/**
 * File: src/routes/jobseeker.routes.js
 * Description: File responsible for API routes for 
 *         'Job Seeker' class
 * 
 */


import express from "express"
import jobseekerController from "../controllers/jobseekercontroller.js"

const router = express.Router();

router.get('/jobseeker', (req, res) => {
    const userAgent = req.headers['user-agent']; // Accessing the 'User-Agent' header
    const authorization = req.headers['authorization']; // Accessing the 'Authorization' header

    console.log('User-Agent:', userAgent);
    console.log('Authorization:', authorization);

    res.send('Headers logged!');
});

// ==> Defining CRUD routes for 'Jobs':

// ==> Route responsible for creating new Job Seeker: (POST) localhost: 3000/api/jobseeker
router.post('/', jobseekerController.createJobSeeker);

// ==> Route responsible for listing all jobseekers created: (GET) localhost: 3000/api/jobseeker
router.get('/', jobseekerController.listAllJobSeekers);


// ==> Route responsible for fetching a job seeker detail on the basis of Id. : (GET) localhost: 3000/api/jobseeker:id
router.get('/:id', jobseekerController.findJobSeekerById);

// ==> Route responsible for updating a job seeker on the basis a specified Id. : (PUT) localhost: 3000/api/jobseeker/:id
router.put('/:id', jobseekerController.updateJobSeekerById);

// ==> Route responsible for deleting a job seeker on the basis of a specified Id. : (DELETE) localhost: 3000/api/jobseeker/:id
router.delete('/:id', jobseekerController.deleteJobSeekerById);


// ==> Route responsible for creating new Job seeker: (POST)
//localhost: 3000 / api / jobseeker
//router.post('/', jobseekerController.createJobSeeker);


export default router