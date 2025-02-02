
var mysql = require('mysql2');

var dbconnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        return conn;
    }
};
module.exports = dbconnect