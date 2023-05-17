const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors())
app.use(express.json())

const initDb = require('./config_db')
initDb()

const router = require('./routes')
app.use('/', router)

const PORT = 8080
app.listen(PORT, () => {
    console.log("Server started");
});