const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const api = require('./api.js');
const files = require('./functions/files.js');

//Sending the files
router.get('/', files.login);
router.get('/signup', files.signUp)
router.get('/coursePage/', files.courses);
router.get('/coursePage/:id', files.course);

//Retrieving course info
router.get('/courseInfo/', api.courses);
router.get('/courseInfo/:id', api.rating);

//Account functionality
router.post('/signup', api.signUp);
router.post('/login', api.login);

//Posting a new review
router.post('/review', api.review);

//api
module.exports = router;
