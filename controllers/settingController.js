const express = require('express');
const router = express.Router();
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const Setting = require('../models/Setting');

module.exports = {
    deleteUser: async(req, res) => {
        const {userIdx} = req.body;
        if(!userIdx) {
            res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
        const idx = await Setting.deleteUser(userIdx);
        return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.DELETE_USER_SUCCESS, idx));
        }
}