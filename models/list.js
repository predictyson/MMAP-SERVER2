const pool = require('../modules/pool');
const table = 'marker';

const list = {
    getRecords: async(userIdx) => {
        const query = `SELECT m.markerIdx, m.postImg, m.city, m.country, m.text, m.date, m.user_userIdx, m.location, u.name FROM ${table} AS m JOIN user AS u ON m.user_userIdx = u.userIdx WHERE m.user_userIdx = "${userIdx}"`;
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log('get posts ERROR : ', err);
            throw err;
        }
    },
    updateList: async(markerIdx, postImg, city, country, text, date, lattitude, longtitude, location, userIdx) => {
        const fields = `postImg = ?, city = ?, country = ?, text = ?, date = ?, lattitude = ?, longtitude = ?, location = ? , user_userIdx = ?`;
        const values = [postImg, city, country, text, date, lattitude, longtitude, location, userIdx];
        const query = `UPDATE ${table} SET ${fields} WHERE markerIdx = ${markerIdx}`;
        try{
            const result = await pool.queryParamArr(query, values);
            return result;
        } catch(err) {
            console.log("UPDATE LIST ERROR");
            throw err;
        }
    },
    deleteList: async (markerIdx) => {
        const query  = `DELETE FROM ${table} WHERE markerIdx = "${markerIdx}"`;
        try{
            const result = await pool.queryParamArr(query);
            return true;
        } catch (err) {
            console.log("DELETE LIST ERROR", err);
            throw err;
        }
    }
}

module.exports = list;