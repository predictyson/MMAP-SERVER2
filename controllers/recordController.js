const express = require('express');
const router = express.Router();
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const Record = require('../models/record');

module.exports = {
    addRecords: async(req, res) => {
        const userIdx = req.userIdx;
        const img = req.file.location;
        //data check (undefined)
        if (img === undefined ) {
            return res.status(statusCode.OK).send(util.success(statusCode.BAD_REQUEST, resMessage.NULL_IMAGE));
        }
        //image type check
        const type  = req.file.mimetype.split('/')[1];
        if (type !== 'jpeg' && type !== 'jpg' && type !== 'png') {
            return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.UNSUPPORTED_TYPE));
        }
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
            lattitude, 
            longtitude,
        } = req.body;

        if( !city || !country || !text || !lattitude || !longtitude ){
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }

        const pIdx = await Record.addRecord(city, country, text, lattitude, longtitude, userIdx, img);
        
        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.ADD_POST_SUCCESS,{
                postIdx: pIdx
            }));
    }
}