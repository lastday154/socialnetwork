const express = require('express')
const bodyParser = require('body-parser');
const User = require('./models/user');
const Friend = require('./models/friend');
const app = express()
app.use(bodyParser.json());


app.post('/users/subscribe', (req, res) => {
	let user = req.body;
	if (!user.requestor || !user.target) {
		res.json({success: false, error : 'please provide emails'})
	}
	let requestorEmail = user.requestor;
	let targetEmail = user.target;
	emails = [requestorEmail, targetEmail];
	User.saveUsers(emails);
	User.findUsers('email', emails, (rows) => {
		let users = {};
		rows.forEach((row) => {
			users[row.email] = row.user_id;
		});

		Friend.saveAndSubscribe([users[requestorEmail], users[targetEmail]], (result) => {
			res.json({success: true});
		});
	});
});

app.post('/users/common', (req, res) => {
	let user = req.body;
	if (typeof user.friends == "undefined") {
		res.json({success: false, error : 'please provide emails'})
	}
	let emails = user.friends;
	Friend.findCommonFriends(emails, (rows) => {
		let userIds = rows.map((row) => {
			return row.friend_id;
		});
		User.findUsers('user_id', userIds, (users) => {
			let emails = users.map((user) => {
				return user.email;
			});
			res.json({
				success: true,
				friends: emails,
				count: emails.length
			})
		});
	})	
	
});


app.post('/users/fetch', (req, res) => {
	let user = req.body;
	if (typeof user.email == "undefined") {
		res.json({success: false, error : 'please provide email'})
	}	
	let email = user.email;
	Friend.joinWithUser(email, (rows) => {
		let userIds = rows.map((row) => {
			if (row.is_friend) {
				return row.friend_id;
			}
		});
		User.findUsers('user_id', userIds, (users) => {
			let emails = users.map((user) => {
				return user.email;
			});
			res.json({
				success: true,
				friends: emails,
				count: emails.length
			})
		});
	});
});

app.post('/users/create', (req, res) => {
	let user = req.body;
	if (typeof user.friends == "undefined") {
		res.json({success: false, error : 'please provide emails'})
	}
	let emails = user.friends;
	User.saveUsers(emails);
	User.findUsers('email', emails, (users) => {
		let userIds = users.map((user) => {
			return user.user_id;
		});
		Friend.saveFriends(userIds, (result) => {
			res.json({success: true});
		});
	});
});


app.listen(3000, () => console.log('Example app listening on port 3000!'))