const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const api = require('./api.js');
const files = require('./files.js');

router.get('/', files.login);
router.get('/coursePage/', files.courses);
router.get('/coursePage/:id', files.course);

router.get('/courseInfo/', api.courses);
router.get('/courseInfo/:id', api.rating);

router.post('/signup', api.signUp);
router.post('/login', api.login);
router.post('/review', api.review);

//api
module.exports = router;
