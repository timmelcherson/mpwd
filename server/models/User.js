const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
	firstName: {
		type: String,
		default: ''
	},
	lastName: {
		type: String,
		default: ''
	},
	email: {
		type: String,
		default: '',
		unique: true
	},
	password: {
		type: String,
		default: ''
	},
	isDeleted: {
		type: Boolean,
		default: false
	}
});

// Create a hash to encrypt users password
UserSchema.methods.generateHash = function(password) {
	return bcryptjs.hashSync(password, bcryptjs.genSaltSync(8), null);
};

// Verify a users password
UserSchema.methods.validPassword = function(password) {
	return bcryptjs.compareSync(password, this.password);
};

module.exports = User = mongoose.model('User', UserSchema);
