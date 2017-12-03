const mysql = require('mysql')

// Connect to mysql
const connection = mysql.createConnection({
  host     : 'v02yrnuhptcod7dk.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user     : 'j22oei3z3sm5jnp4',
  password : 'btrvm004jsnf5jjc',
  database : 'fqvps57wkdt5o30m'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;