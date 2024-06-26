const express = require('express')
require('dotenv').config()
const cors = require('cors')
const dbConn = require("./src/config/DBConnect")
const initRoutes = require('./src/routes')
require("./src/config/redis.config")

const app = express();
// Config truy cập tài nguyên
app.use(cors({
    origin: process.env.CLIENT_URL
}))
// hanlder data về json  và từ json về data
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
initRoutes(app);
dbConn();
const PORT = process.env.PORT || 8000
app.use('/', (req, res) => res.send('server on 12'))
app.listen(PORT, () => console.log("SEVER ON WITH PORT:", PORT))