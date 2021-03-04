const express = require('express');
const router = express.Router();
const mapController = require('../controllers/mapController');
const middleware = require('../modules/middlewares');
// const upload = require('../modules/multer');

//router.get('/:userIdx',mapController.getMarkers);
router.post('/post', middleware.userJwt, mapController.addPost);
router.get('/:userIdx', mapController.getMarkers);

module.exports = router; 