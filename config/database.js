const mysql = require('promise-mysql');

const config = {
    host: 'db-mmap.cqbkvlnjvofd.ap-northeast-2.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'qwer1812879',
    database: 'mmap'
}

module.exports = mysql.createPool(config);