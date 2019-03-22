const {ERRORS} = require('../const');
const mongoose = require('../lib/mongoose');

const article = new mongoose.Schema({
  title : {
    type     : String,
    required : true,
    minlength: 1
  },
  body  : {
    type     : String,
    required : true,
    minlength: 1
  }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

function validField(name, value){
  if (value === undefined) {
    return {isValid: false, err: {field: name, error: `${name} ${ERRORS.REQUIRED_STRING}`}};
  } else {
    if (!value) {
      return {isValid: false, err: {field: name, error: `${name} ${ERRORS.EMPTY_STRING}`}};
    }
  }
  return {isValid: true}
}
article.statics.validFields = function(title, body) {
  const errors = [];

  let err = validField('title', title);
  if (!err.isValid) errors.push(err.err);
  err = validField('body', body);
  if (!err.isValid) errors.push(err.err);

  return errors;
};

module.exports = mongoose.model('Article', article);

// function UndefinedStringError(message) {
//   Error.call(this, arguments);
//   Error.captureStackTrace(this);
//   this.name = "UndefinedStringError";
//   this.message = message;
// }
//
// function EmptyStringError(message) {
//   Error.call(this, arguments);
//   Error.captureStackTrace(this);
//   this.name = "EmptyStringError";
//   this.message = message;
// }


