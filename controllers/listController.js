const express = require('express');
const router = express.Router();
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const List = require('../models/list');

module.exports = {
    getPosts: async(req, res) => {
        const userIdx = req.params.userIdx;
        if( !userIdx ) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
        const idx = await List.getPosts(userIdx);
        return res.status(statusCode.OK) 
        .send(util.success(statusCode.OK, resMessage.GET_POSTS_SUCCESS, idx));
    }
}