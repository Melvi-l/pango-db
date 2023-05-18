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
})

const Pangolin = mongoose.model('Pangolin', pangolinSchema)

module.exports = Pangolin