const mongoose = require('mongoose')
const pangolin = require('./models/pangolin')

function initDb() {
    const DB_URI = "mongodb+srv://luno:sedX2ThNlXncg9A0@revision.nkwrvur.mongodb.net/?retryWrites=true&w=majority"
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    mongoose.connection.on('connected', async () => {
        console.log('Connexion réussi')
    })
    mongoose.connection.on('error', (err) => {
        console.error('Erreur de connexion:', err)
    })
}

module.exports = initDb