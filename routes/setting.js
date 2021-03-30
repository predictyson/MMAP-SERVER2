const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingController');

router.delete('/delete',  settingController.deleteUser);

module.exports = router; 