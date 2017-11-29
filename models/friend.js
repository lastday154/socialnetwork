const db = require('../db');

module.exports.saveFriends = (userIds, callback) => {

	let values = "(" + userIds.join(",") + ",1),"
	values += "(" + userIds.reverse().join(",") + ",1)";
	let sql = "INSERT IGNORE INTO friend(`user_id`, `friend_id`, `is_friend`) VALUES" + values;
  
  db.query(sql, function (err, result) {
    if (err) throw err;
    callback(result);
  });
}


