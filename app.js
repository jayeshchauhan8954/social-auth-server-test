const express = require('express')
const connectDB = require('./configs/db');
const bodyParser = require('body-parser')
const cors = require('cors')

const { PORT } = require('./configs/config');
const app = express();
app.use(bodyParser.json())
app.use(cors())
//db connection
connectDB()
app.get('/', (req, res) => { res.send(`<h1>Hello server is up and running for test social authentication system.</h1>`) })
require('./src/routes')(app)

app.listen(PORT, () => {
    console.log(`Server is up and running on port : ${PORT}`)
})