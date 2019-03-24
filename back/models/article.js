const mongoose = require('../lib/mongoose');

const article = new mongoose.Schema({
  title : {
    type     : String,
    trim     : true,
    required : true
  },
  body  : {
    type     : String,
    trim     : true,
    required : true
  }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('Article', article);