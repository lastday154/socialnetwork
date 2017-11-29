const db = require('../db');

module.exports.saveFriends = (userIds, callback) => {

	let values = "(" + userIds.join(",") + ",1),"
	values += "(" + userIds.reverse().join(",") + ",1)";
	let sql = "REPLACE INTO friend(`user_id`, `friend_id`, `is_friend`) VALUES" + values;
  
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

module.exports.replace = (userIds, column, callback) => {
	let values = "(" + userIds.join(",") + ",1)"
	let sql = "REPLACE INTO friend(`user_id`, `friend_id`, " + column  + ") VALUES" + values;
  console.log(sql);
  db.query(sql, function (err, result) {
    if (err) throw err;
    callback(result);
  });
};

module.exports.subscribe = (userIds, column, callback) => {
	let values = "(" + userIds.join(",") + ",1)"
	let sql = "INSERT INTO friend(`user_id`, `friend_id`, " + column  + ") VALUES" + values;
  sql += "ON DUPLICATE KEY UPDATE `is_subscribe`=1";
  console.log(sql);
  db.query(sql, function (err, result) {
    if (err) throw err;
    callback(result);
  });
};

module.exports.retrieve = (email, callback) => {
	sql = "SELECT email FROM user WHERE user_id IN (SELECT friend_id FROM friend JOIN user WHERE friend.user_id = user.user_id AND (is_friend = 1 OR is_subscribe = 1) AND (is_block <> 1 OR is_block IS NULL) AND ";
	sql += "email = '" + email + "')";
	console.log(sql);
  db.query(sql, function (err, result) {
    if (err) throw err;
    callback(result);
  });
};




