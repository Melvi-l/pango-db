const express = require('express')
const cors = require('cors')
const app = express()


app.use(cors())
app.use(express.json())

const initDb = require('./config_db')
initDb()

const authRoutes = require('./routes/auth')
const pangolinRoutes = require('./routes/pangolin')
app.use('/auth', authRoutes)
app.use('/pangolin', pangolinRoutes)

app.get('/', (req, res) => res.send("Hello World !"))

const PORT = 8080
app.listen(PORT, () => {
    console.log("Server started")
})

module.exports = app