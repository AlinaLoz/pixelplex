const CONST = require("../const");
const {validLimit, validPage, getError} = require("../lib/validNumber");
const Article = require('../models/article');

exports.post = function (req, res) {
  const {title, body} = req.body;

  const article = new Article({title, body});
  article.save()
    .then(data => res.send(201, data))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(422).json(ErrorFormatter(err));
      } else {
        res.status(500).json(err);
      }
    });
};

exports.put = function (req, res) {
  const {id} = req.params;
  const {title, body} = req.body;

  Article.findById(id)
    .then(article => {
      Article.findOneAndUpdate({_id: id}, {title, body}, { runValidators: true })
        .then(data => res.send(201, data))
        .catch(err => {
          if (err.name === 'ValidationError') {
            res.status(422).json(ErrorFormatter(err));
          } else {
            res.status(500).json(err);
          }
        });
    })
    .catch(err => res.send(404, [{errors: {field: "id", error: "not found"}}]));
};

exports.getOne = function (req, res) {
  const {id} = req.params;

  Article.findById(id)
    .then(data => res.send(200, data))
    .catch(err => res.send(404, ErrorFormatter(err)));
};

exports.getAll = async function (req, res) {
  const {page = 1, limit = 10} = req.query;
  const objErrors = {
    name: "ValidationError",
    errors: {}
  };
  const errorLimit = validLimit(limit);
  const errorPage = validPage(page);
  if (errorLimit !== true) {
    objErrors.errors.limit = errorLimit;
  }
  if (errorPage !== true) {
    objErrors.errors.page = errorPage;
  }

  if (Object.keys(objErrors.errors).length > 0) {
    return res.status(422).json(ErrorFormatter(objErrors));
  }

  Article.count({}, function (err, date) {
    const count = date;
    const countPage = Math.ceil(count / CONST.APP_CONST.MAX_LIMIT);
    if (parseInt(page) > countPage) {
      objErrors.errors.page = getError('page', 'this page number is not exist');
      return res.status(404).json(ErrorFormatter(objErrors));
    }
    Article.find({},null,{limit: +limit, skip: CONST.APP_CONST.MAX_LIMIT * (page - 1)}).sort({_id: -1})
      .then(articles => {
        return res.status(200).send(articles);
      })
      .catch(err => res.status(500).send(err));
  })
};

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

