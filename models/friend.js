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

module.exports.joinWithUser  = (email, callback) => {
	let sql = "SELECT * FROM user JOIN friend ON user.user_id = friend.user_id WHERE email = '" + email + "'";
	db.query(sql, function (err, result) {
    if (err) throw err;
    callback(result);
  });
}

module.exports.findCommonFriends  = (emails, callback) => {
	let sql = "SELECT DISTINCT a.friend_id FROM " +
		"(SELECT friend_id FROM user JOIN friend ON user.user_id = friend.user_id " +
		"WHERE is_friend = 1 AND email = '" + emails[0] + "') as a " + 
		"INNER JOIN " + 
		"(SELECT friend_id FROM user JOIN friend ON user.user_id = friend.user_id " +
		"WHERE is_friend = 1 AND email = '" + emails[1] + "') as b ON a.friend_id = b.friend_id";
	console.log(sql);
	db.query(sql, function (err, result) {
    if (err) throw err;
    callback(result);
  });
}

module.exports.saveAndSubscribe = (userIds, callback) => {
	let values = "(" + userIds.join(",") + ",1)"
	let sql = "INSERT IGNORE INTO friend(`user_id`, `friend_id`, `is_subscribe`) VALUES" + values;
  
  db.query(sql, function (err, result) {
    if (err) throw err;
    callback(result);
  });
};



