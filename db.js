const mysql = require('mysql')

// Connect to mysql
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'connect'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;