require('dotenv').config();
const mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.connect(`mongodb://${process.env.HOST_DB}:${process.env.PORT_DB}/${process.env.NAME_DB}`, function (err) {
  if (err) throw err;
  console.log('connection to mongodb is installed.');
});

module.exports = mongoose;