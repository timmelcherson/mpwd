const express = require('express');
const router = express.Router();

const User = require('../../models/User');

// @route POST api/signup
// @desc Create a new User
// @access Public
router.post('/', (req, res) => {
	const { body } = req;
	const { firstName, lastName, password } = body;
	let { email } = body;

	// Check if request body has firstName set
	if (!firstName) {
		return res.send({
			success: false,
			message: "Error: First name can't be found"
		});
	}

	// Check if request body has lastName set
	if (!lastName) {
		return res.send({
			success: false,
			message: "Error: Last name can't be found"
		});
	}

	// Check if request body has email set
	if (!email) {
		return res.send({
			success: false,
			message: "Error: Email name can't be found"
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

	// Steps
	// 1. Verify email doesn't exist
	// 2. Save
	User.find(
		{
			email: email
		},
		(err, previousUsers) => {
			if (err) {
				return res.send({
					success: false,
					message: 'Error: Server error'
				});
			} else if (previousUsers.length > 0) {
				return res.send({
					success: false,
					message: 'Error: Account already exists'
				});
			} else {
				// If no error, create new User and set values
				const newUser = new User();

				newUser.email = email;
				newUser.firstName = firstName;
				newUser.lastName = lastName;

				// Encrypt the password
				newUser.password = newUser.generateHash(password);

				// Save new User to the DB
				newUser.save(err => {
					if (err) {
						return res.send({
							success: false,
							message: 'Error: Server error'
						});
					}
					return res.send({
						success: true,
						message: 'Signed Up'
					});
				});
			}
		}
	);
});

module.exports = router;
