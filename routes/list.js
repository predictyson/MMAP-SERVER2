const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');
const middleware = require('../modules/middlewares');
const upload = require('../modules/multer');

router.get('/:userIdx',upload.single('img'),listController.getRecords);
//router.put('/update/:userIdx', listController.updateList);
//router.delete('/delete/:userIdx', listController.deleteList);

module.exports = router; 