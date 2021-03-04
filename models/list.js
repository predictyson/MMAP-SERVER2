const pool = require('../modules/pool');
const table = 'list';

const list = {
    getPosts: async(userIdx) => {
        const query = `SELECT list.city, list.country, list.text, list.user_userIdx FROM ${table} JOIN user ON user.userIdx = ${table}.user_userIdx WHERE user_userIdx = "${userIdx}"`;
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log('get posts ERROR : ', err);
            throw err;
        }
    }
}

module.exports = list;