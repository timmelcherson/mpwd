const express = require('express');
const router = express.Router();

const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

// @route POST api/signin
// @desc Sign in a User and create a User Session
// @access Public
router.post('/', (req, res) => {
	const { body } = req;
	const { password } = body;
	let { email } = body;

	// Check if request body has email set
	if (!email) {
		return res.send({
			success: false,
			message: "Error: Email can't be found"
		});
	}

	// Check if request body has password set
	if (!password) {
		return res.send({
			success: false,
			message: "Error: Password name can't be found"
		});
	}

	// Set email characters to lower case for easier handling
	email = email.toLowerCase();

	// Find user based on email
	User.find(
		{
			email: email
		},
		(err, users) => {
			if (err) {
				return res.send({
					success: false,
					message: 'Server Error'
				});
			}

			// Validate that the user is unique
			if (users.length != 1) {
				return res.send({
					success: false,
					message: 'Error: No user found'
				});
			}

			// Assign a single user object
			const user = users[0];

			// Validate the entered password
			if (!user.validPassword(password)) {
				return res.send({
					success: false,
					message: 'Error: Invalid Password'
				});
			}

			// If everything is correct, create a new User Session and assign it to the User
			const userSession = new UserSession();
			userSession.userId = user._id;

			// Save the User Session to the DB
			userSession.save((err, doc) => {
				if (err) {
					return res.send({
						success: false,
						message: 'Error: Server Error'
					});
				}

				return res.send({
					success: true,
					message: 'Valid signin',
					token: doc._id
				});
			});
		}
	);
});

// @route GET api/signin/verify
// @desc Verify the token for a User Session to uniquely identify it
// @access Public
router.get('/verify', (req, res) => {
	const { query } = req;
	const { token } = query;

	// Verify that it is one-of-a-kind and not deleted
	UserSession.find(
		{
			_id: token,
			isDeleted: false
		},
		(err, sessions) => {
			if (err) {
				return res.send({
					success: false,
					message: 'Server Error'
				});
			}

			// Verify that the session is unique
			if (sessions.length != 1) {
				return res.send({
					success: false,
					message: 'Error: Invalid'
				});
			} else {
				return res.send({
					success: true,
					message: 'Valid verification'
				});
			}
		}
	);
});

// @route GET api/signin/logout
// @desc Logout a User
// @access Public
router.get('/logout', (req, res) => {
	// Get the token
	const { query } = req;
	const { token } = query;

	// Verify that the User Session is one-of-a-kind and not deleted
	UserSession.findOneAndUpdate(
		{
			_id: token,
			isDeleted: false
		},
		{
			// Mark the User Session as deleted
			$set: { isDeleted: true }
		},
		null,
		err => {
			if (err) {
				return res.send({
					success: false,
					message: 'Error: Server Error'
				});
			}
			return res.send({
				success: true,
				message: 'Good'
			});
		}
	);
});

module.exports = router;
