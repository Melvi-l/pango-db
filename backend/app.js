const express = require('express');
const cors = require('cors');
const app = express();

const initDb = require('./config_db')

app.use(cors())
app.use(express.json())

initDb()

app.use('/', router)

const PORT = 8080
app.listen(PORT, () => {
    console.log(Server started);
});