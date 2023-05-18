const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pangolin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pangolin',
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
}],
})
  
userSchema.plugin(uniqueValidator) 
 
const User = mongoose.model('User', userSchema)

module.exports =  User