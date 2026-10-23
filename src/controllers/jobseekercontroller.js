import express from "express"

const app = express()
// Middleware to parse JSON bodies
app.use(express.json());

import db from "../config/database.js"

// ==> Method responsible for creating a new 'Job'

async function createJobSeeker(req, res) {
    //Debug Statement
    console.log('jobseeker.controller:createJobSeeker: request body received', req.body);

    const { jobseekeremail, jobseekerpassword, jobseekerfirstname, jobseekerlastname } = req.body;
    const response = await db.query("INSERT INTO jobseeker (jobseekeremail, jobseekerpassword, jobseekerfirstname, jobseekerlastname) VALUES ($1, $2, $3, $4) RETURNING jobseekerid",
        [jobseekeremail, jobseekerpassword, jobseekerfirstname, jobseekerlastname]
    );

    //Debug Statement
    console.log('jobseeker.controller:createJobSeeker: response received', response);

    const jobseekerid = response.rows[0].jobseekerid;

    //Debug Statement
    console.log('jobseeker.controller:createJobSeeker: New Job Seeker Id', jobseekerid);

    res.status(201).send({
        message: "Job Seeker registered successfully!",
        body: {
            jobseeker: { jobseekerid, jobseekeremail, jobseekerpassword, jobseekerfirstname, jobseekerlastname }
        },
    });
};


//Generally used to update Job Seeker details after initial registration with email, password, first name and last name.
// ==> Method responsible for updating a job seeker on the basis of specified id.
async function updateJobSeekerById(req, res) {
    //Debug Statement
    console.log('jobseeker.controller:updateJobSeekerById: request body received', req.body);

    const jobseekerId = parseInt(req.params.id);
    const { jobseekeremail, jobseekerfirstname, jobseekerlastname, jobseekerdob, jobseekerlocation, jobseekeraddress, jobseekerprofessionalheadline, jobseekerprofessionalsummary, jobseekerskills } = req.body;

    const response = await db.query('UPDATE jobseeker SET jobseekeremail = $1, jobseekerfirstname = $2, jobseekerlastname = $3, \
               jobseekerdob = $4, jobseekerlocation = $5, jobseekeraddress = $6, jobseekerprofessionalheadline = $7, jobseekerprofessionalsummary = $8, \
               jobseekerskills = $9  WHERE jobseekerid = $10',
        [jobseekeremail, jobseekerfirstname, jobseekerlastname, jobseekerdob, jobseekerlocation, jobseekeraddress, jobseekerprofessionalheadline, jobseekerprofessionalsummary, jobseekerskills, jobseekerId]);

    res.status(201).send({
        message: "Job Seeker updated successfully!",
        body: {
            job: { jobseekeremail, jobseekerfirstname, jobseekerlastname, jobseekerdob, jobseekerlocation, jobseekeraddress, jobseekerprofessionalheadline, jobseekerprofessionalsummary, jobseekerskills }
        },
    });
};

// ==> Method responsible for listing all jobs seekers registered.
async function listAllJobSeekers(req, res) {
    //Debug Statement
    console.log('jobsseeker.controller:listAllJobSeekers: request header received', req.header);

    //const response = await db.query('SELECT * from jobseeker ORDER BY jobseekerfirstname ASC');
    
    const response = await db.query("SELECT jobseekerid, jobseekeremail, jobseekerdob,\
        jobseekerfirstname, jobseekerlastname, jobseekerlocation, jobseekeraddress, jobseekerprofessionalheadline, \
        jobseekerprofessionalsummary, jobseekerskills from jobseeker ORDER BY jobseekerfirstname ASC");


    //const response = await db.query("SELECT jobseekerid, jobseekerfirstname, TO_CHAR(jobseekerdob, 'YYYY-MM-DD') as jobseekerdob from jobseeker");

    //Debug Statement
    console.log('jobseeker.controller:listAllJobSeekers: job seeker list ', response.rows);

    res.status(200).send(response.rows);
};

// ==> Method responsible for fetching a job seeker detail on the basis of specfied id.
async function findJobSeekerById(req, res) {
    //Debug Statement
    console.log('jobseeker.controller:findJobSeekerById: request body received', req.body);

    const jobseekerId = parseInt(req.params.id);
    const response = await db.query('SELECT * from jobseeker WHERE jobseekerid = $1', [jobseekerId]);

    //Debug Statement
    console.log('jobseeker.controller:findJobSeekerById: job seeker details ', response.rows);

    res.status(200).send(response.rows);
};



// ==> Method responsible for deleting a job seeker on the basis of specified id.
async function deleteJobSeekerById(req, res) {
    const jobSeekerId = parseInt(req.params.id);

    const response = await db.query('DELETE FROM jobseeker WHERE jobseekerid = $1', [jobSeekerId]);
    res.status(200).send({ message: "Deleted Job Seeker bearing identity number: ", jobSeekerId });
};

//export default job.controller
export default {
    createJobSeeker,
    listAllJobSeekers,
    findJobSeekerById,
    updateJobSeekerById,
    deleteJobSeekerById

}