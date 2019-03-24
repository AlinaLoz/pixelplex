require('dotenv').config();
const mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.NAME_DB}`, function (err) {
  if (err) throw err;
  console.log('connection to mongodb is installed.');
});

module.exports = mongoose;