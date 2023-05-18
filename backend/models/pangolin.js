const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const pangolinSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['Guerrier', 'Alchimiste', 'Sorcier', 'Espion', 'Enchanteur'],
        default: 'Guerrier',
    },
    friendIdList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
})

pangolinSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    }
});

pangolinSchema.plugin(uniqueValidator)

const Pangolin = mongoose.model('Pangolin', pangolinSchema)

module.exports = Pangolin