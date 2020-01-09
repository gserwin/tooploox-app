
const express = require('express')
const bodyParser = require('body-parser');

var cors = require('cors')

const app = express()
const port = 3000
app.use(cors())
app.use(bodyParser.json());
require('./routes')(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
