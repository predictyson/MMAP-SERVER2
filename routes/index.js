var express = require('express');
var router = express.Router();

router.use('/user', require('./user'));
router.use('/map', require('./map'));
router.use('/list', require('./list'));

module.exports = router;
