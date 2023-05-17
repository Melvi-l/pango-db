const mongoose = require('mongoose')

function initDb() {
    const DB_URI = "mongodb://localhost:27017/"
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