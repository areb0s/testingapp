const mysql = require('mysql');
const conn = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '123qwe',
	database : 'sample'
});
conn.connect();
module.exports = conn;
