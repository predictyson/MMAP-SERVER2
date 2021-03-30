const pool = require('../modules/pool');
const table = 'user';

const Setting = {
    deleteUser: async(userIdx) => {
        const query = `DELETE FROM ${table} WHERE userIdx = "${userIdx}"`;
        try{
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log('DELETE USER ERROR', err);
            throw err;
        }
    }
}

module.exports = Setting;