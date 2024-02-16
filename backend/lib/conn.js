const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "doc_library",
    password: "doc_library",
    database: "doc_library",
})

module.exports = connection;