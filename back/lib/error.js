function getError(field, message) {
  return {
    field,
    message
  }
}

function ErrorFormatter(obj) {
  if (obj.name === 'ValidationError') {
    return {errors: Object.keys(obj.errors).map(key => {
        return {
          field: key,
          error: obj.errors[key].message.split(' ').slice(1).join(' ')
        }
      })};
  }
  if (obj.name === 'CastError') {
    return {
      errors: [{
        field: obj.path,
        error: "Not Found"
      }]
    }
  }
}


exports.getError = getError;
exports.ErrorFormatter = ErrorFormatter;
