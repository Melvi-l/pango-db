const mongoose = require('mongoose')

const pangolinSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Guerrier', 'Alchimiste', 'Sorcier', 'Espion', 'Enchanteur'],
        default: 'Guerrier',
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pangolin',
    }],
})

module.exports = mongoose.model('Pangolin', pangolinSchema)