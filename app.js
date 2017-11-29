const express = require('express')
const bodyParser = require('body-parser');
const User = require('./models/user');
const Friend = require('./models/friend');
const app = express()
app.use(bodyParser.json());


app.post('/users/create', (req, res) => {
	let user = req.body;
	if (typeof user.friends == "undefined") {
		res.json({success: false, error : 'please provide emails'})
	}
	let emails = user.friends;
	User.saveUsers(emails);
	User.findUsersByEmails(emails, (users) => {
		let userIds = users.map((user) => {
			return user.user_id;
		});
		Friend.saveFriends(userIds, (result) => {
			res.json({success: true});
		});
	});
});


app.listen(3000, () => console.log('Example app listening on port 3000!'))