const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const api = require('./api.js');
const files = require('./files.js');

router.get('/', files.index);
router.get('/login/', files.login );
router.get('/course/', files.index);

router.get('/courses/', files.index);
router.get('/course/:id', files.index);

router.post('/signup', api.signUp);
router.post('/login', api.login);

//api
module.exports = router;
