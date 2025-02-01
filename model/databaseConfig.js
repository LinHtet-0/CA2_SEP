var mysql = require('mysql2');
var dbconnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Loveofmylifebaby12!@",
            database: "sepca2"
        });
        return conn;
    }
};
module.exports = dbconnect