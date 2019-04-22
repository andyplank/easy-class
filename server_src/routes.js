const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(express.static('public'));

const api = require('./api.js');
const files = require('./files.js');

router.get('/', files.index);
router.get('/login/', files.login );
router.get('/course/', files.index);

router.get('/courses/', files.index);
router.get('/course/:id', files.index);

//api
module.exports = router;
