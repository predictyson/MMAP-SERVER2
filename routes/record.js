const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');
const middleware = require('../modules/middlewares');

router.post('/', middleware.userJwt, recordController.addRecords);

module.exports = router; 