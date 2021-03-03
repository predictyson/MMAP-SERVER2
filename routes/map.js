const express = require('express');
const router = express.Router();
const User = require('../models/user');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');

router.get('/marker', async (req, res) => {
    const id = req.param.id;
    
})

module.exports = router;