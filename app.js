const express = require('express')
const bodyParser = require('body-parser');
const User = require('./models/user');
const Friend = require('./models/friend');
const app = express()
app.use(bodyParser.json());


app.post('/users/retrieve', (req, res) => {
	let user = req.body;
	if (!user.sender || !user.text) {
		res.json({success: false, error : 'please provider sender and text'})
	}
	updateEmail = user.text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
	senderEmail = user.sender;
	if (updateEmail) {
		emails = [senderEmail, updateEmail];
		User.saveUsers(emails);
		User.findUsers('email', emails, (rows) => {
			let users = {};
			rows.forEach((row) => {
				users[row.email] = row.user_id;
			});

			Friend.subscribe([users[senderEmail], users[updateEmail]], 'is_subscribe', (result) => {
			});
		});
	}
	Friend.retrieve(senderEmail, (rows) => {
		let emails = rows.map((row) => {
			return row.email;
		});
		res.json({success : true, recipients : emails})
	});

});

app.post('/users/block', (req, res) => {
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

		Friend.replace([users[requestorEmail], users[targetEmail]], 'is_block', (result) => {
			res.json({success: true});
		});
	});
});

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

		Friend.subscribe([users[requestorEmail], users[targetEmail]], 'is_subscribe', (result) => {
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