const db = require('../db');

module.exports.saveUsers = (emails) => {
	let values = "";
	emails.forEach((email) => {
		values += "('" + email + "'),"
	});
	let sql = "INSERT IGNORE INTO user (email) VALUES" + values.slice(0, -1);
  
  db.query(sql, function (err, result) {
    if (err) throw err;
  });
}

module.exports.findUsers = (key, values, callback) => {
		values = values.join("','");
    let sql = "SELECT * FROM user WHERE " +  key + " IN ('" + values + "')";
    db.query(sql, function (err, result) {
    	callback(result);
  })
}

