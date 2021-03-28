const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');
const middleware = require('../modules/middlewares');
const upload = require('../modules/multer');

router.get('/:userIdx',upload.single('postImg'),listController.getRecords);
router.put('/update/:markerIdx',middleware.userJwt, upload.single('postImg') ,listController.updateList);
router.delete('/delete',  listController.deleteList);

module.exports = router; 