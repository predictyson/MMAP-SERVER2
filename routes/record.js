const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');
const middleware = require('../modules/middlewares');
const upload = require('../modules/multer');

router.post('/', middleware.userJwt, upload.single('img'),recordController.addRecords);

module.exports = router; 