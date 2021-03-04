const pool = require('../modules/pool');
const table = 'marker';

const record = {
    addRecord: async( city, country, text, lattitude, longtitude, userIdx) => {
        const fields = `city, country, text, lattitude, longtitude, user_userIdx`;
        const questions = `?,?,?,?,?,?`;
        const values = [city, country, text, lattitude, longtitude, userIdx];
        const query =  `INSERT INTO ${table} (${fields}) VALUES (${questions})`;
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
    }
}


module.exports = record;