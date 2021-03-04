const express = require('express');
const router = express.Router();
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const Map = require('../models/map');

module.exports = {
    getMarkers: async(req, res) => {
        const userIdx = req.params.userIdx;
        if(!userIdx) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
        const idx = await Map.getMarkers(userIdx);
        return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.GET_MARKERS_SUCCESS, idx));
    },
    addPost: async(req, res) => {
        const userIdx = req.userIdx;

        if(!userIdx) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.EMPTY_TOKEN));
            return;
        }
        //img here
        //const postImg = req.file.location;

        const {
            city,
            country,
            text,
        } = req.body;

        if( !city || !country || !text ){
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }

        const pIdx = await Map.addPost(city, country, text, userIdx);
        
        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.ADD_POST_SUCCESS,{
                postIdx: pIdx
            }));
    }
}