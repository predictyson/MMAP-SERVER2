const pool = require('../modules/pool');
const table = 'marker';

const list = {
    getRecords: async(userIdx) => {
        const query = `SELECT marker.city, marker.country, marker.text, marker.user_userIdx FROM ${table} JOIN user ON user.userIdx = ${table}.user_userIdx WHERE user_userIdx = "${userIdx}"`;
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