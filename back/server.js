require('dotenv').config();
const express = require("express");
const cors = require('express-cors');
const bodyParser = require("body-parser");
const app = express();

app.use(cors({allowedOrigins: [`localhost:8081`]}));
app.use(bodyParser.json());

require('./routes')(app);

app.listen(process.env.SERVER_PORT, function () {
  console.log('server is listening', process.env.SERVER_PORT);
});
