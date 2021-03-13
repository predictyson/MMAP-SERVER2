const pool = require('../modules/pool');
const table = 'marker';

const map = {
    addPost: async (city, country, text, userIdx) => {
        const fields = `city, country, text, user_userIdx`;
        const questions = `?,?,?,?`;
        const values = [city, country, text, userIdx];
        const query = `INSERT INTO ${listTable}(${fields}) VALUES(${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        } catch(err) {
            if(err.errno == 1062) {
                console.log('duplicate ERROR : ', err.errno, err.code);
                throw err;
            }
            console.log('ADD POST ERROR', err);
            throw err;
        }
    },
    // map 테이블 마커 가져오기 userIdx 가져오면 markerIdx, lat, long
    // from map inner join user on map.userIdx = 30;
    getMarkers : async (userIdx) => {
        const query = `SELECT marker.markerIdx, marker.lattitude, marker.longtitude, marker.city, marker.country, marker.date FROM ${table} LEFT JOIN user ON user.userIdx = marker.user_userIdx WHERE marker.user_userIdx = "${userIdx}"`;
        try{
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log("get markers ERROR : ", err);
            throw err;
        }
    }
}

module.exports = map;