
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const crypto = require('../modules/crypto');
const jwt = require('../modules/jwt');

module.exports = {
    signup: async (req, res) => {
        const {
            id,
            name,
            password,
            email
        } = req.body;
        if (!id || !name || !password || !email) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
        // 사용자 중인 아이디가 있는지 확인
        if (await User.checkUser(id)) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
            return;
        }
        const {
            salt,
            hashed
        } = await crypto.encrypt(password);
        const idx = await User.signup(id, name, hashed, salt, email);
        if (idx === -1) {
            return res.status(statusCode.DB_ERROR)
                .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
    
        const user = await User.getUserById(idx);
    
        if (user[0] === undefined) {
            return res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        }
    
        const  {
            token,
            refreshToken
        } = await jwt.sign(user[0]);
    
        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.CREATED_USER, {
                accessToken: token,
                userIdx: user[0].userIdx
            }));
    },
    
    signin: async (req, res) => {
        const {
            id,
            password
        } = req.body;
        if (!id || !password) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
        const user = await User.findByUserId(id);
        if (user[0] === undefined) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
            return;
        }
        const hashed = await crypto.encryptWithSalt(password, user[0].salt);

        if (user[0].password !== hashed) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
            return;
        }

        const { 
            token,
            __ 
        } = await jwt.sign(user[0]);

        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {
                accessToken: token,
                userIdx : user[0].userIdx,
            }
            ));
    },
    checkUserId: async(req, res) => {
        const{id} = req.body;

        if(!id) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE))
            return;
        }
        if (await User.checkUser(id)) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
            return;
        }
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.AVAILABLE_ID));

    }
    
   
}

