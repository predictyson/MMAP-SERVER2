const pool = require('../modules/pool');
const table = 'marker';

const list = {
    getRecords: async(userIdx) => {
        const query = `SELECT m.postImg, m.city, m.country, m.text, m.date, m.user_userIdx, u.name FROM ${table} AS m JOIN user AS u ON m.user_userIdx = u.userIdx WHERE m.user_userIdx = "${userIdx}"`;
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