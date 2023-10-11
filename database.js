const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Jona1995!',
    database: 'restaurants',
});

// Function to perform queries using the connection pool
function queryDB(query, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) reject(err);
            connection.query(query, values, (error, results) => {
                connection.release();
                if (error) reject(error);
                resolve(results);
            });
        });
    });
}

module.exports = {queryDB};
