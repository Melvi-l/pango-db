const mongoose = require('mongoose')

function initDb() {
    const DB_URI = "mongodb://localhost:27017/"
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    mongoose.connection.on('connected', async () => {
        console.log('Connexion Ã  MongoDB Ã©tablie avec succÃ¨s')
    })
    mongoose.connection.on('error', (err) => {
        console.error('Erreur de connexion Ã  MongoDB:', err)
    })
}

module.exports = initDb()