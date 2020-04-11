const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: 'Email address is required',
		// validate: [validateEmail, 'Please fill a valid email address'],
		// match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
	},
	password: {
		type: String,
		required: 'Password is required',
	},
	name: {
		type: String,
		unique: true,
		required: false, 
	},
},{
  timestamps: true
});

module.exports = User = mongoose.model('User', userSchema);