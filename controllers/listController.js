const express = require('express');
const router = express.Router();
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const List = require('../models/list');

module.exports = {
    getRecords: async(req, res) => {
        const userIdx = req.params.userIdx;
        if( !userIdx ) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
        const idx = await List.getRecords(userIdx);
        return res.status(statusCode.OK) 
        .send(util.success(statusCode.OK, resMessage.GET_RECORDS_SUCCESS, idx));
    },
    getName: async(req, res) => {
        const userIdx = req.params.userIdx;
        if( !userIdx ) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
        const result = await List.getName(userIdx);
        return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.GET_NAME_SUCCESS, result));
    },
    updateList: async(req, res) => {
        const userIdx = req.userIdx;

        if(!userIdx) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.EMPTY_TOKEN));
            return;
        }
        const markerIdx = req.params.markerIdx;
        const postImg = req.file.location;

        const {
            city, 
            country,
            text,
            date,
            lattitude,
            longtitude,
            location
        } = req.body;

        if (!markerIdx || !city || !country || !text || !date || !lattitude || !longtitude || !location ) {
            res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));;
            return;
        }
        const result = await List.updateList(markerIdx, postImg, city, country, text, date, lattitude, longtitude, location, userIdx);
        res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.UPDATE_LIST_SUCCESS, result));
    },
    deleteList: async(req, res) => {
      /*  const userIdx = req.userIdx;
        if( !userIdx ) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }*/
        const {markerIdx} = req.body;
        if (!markerIdx) {
            res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
        const idx = await List.deleteList(markerIdx);
        return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.DELETE_LIST_SUCCESS, idx));
    },

}