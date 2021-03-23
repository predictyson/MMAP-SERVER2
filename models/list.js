const pool = require('../modules/pool');
const table = 'marker';

const list = {
    getRecords: async(userIdx) => {
        const query = `SELECT marker.postImg, marker.city, marker.country, marker.text, marker.date, marker.user_userIdx , user.name FROM ${table} JOIN user ON user.userIdx = ${table}.user_userIdx WHERE user_userIdx = "${userIdx}"`;
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log('get posts ERROR : ', err);
            throw err;
        }
    },
    updateList: async(userIdx) => {
        const query = `UPDATE marker.city, `
    }
}

module.exports = list;