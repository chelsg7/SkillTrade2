const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

// Define userSchema
const userSchema = new Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, unique: true, required: true },
	message: {
		type: [{type: Schema.Types.ObjectId, ref: "Messages"}]
	},
	review: {
		type: [{type: Schema.Types.ObjectId, ref: "Reviews"}]
	},
	profile: {
		type: [{type: Schema.Types.ObjectId, ref: "Reviews"}]
	}
})

// Define schema methods
userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define pre hooks for the save method
userSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('models/user.js hashPassword in pre save');
		
		this.password = this.hashPassword(this.password)
		next()
	}
})

const User = mongoose.model('User', userSchema)
module.exports = User;