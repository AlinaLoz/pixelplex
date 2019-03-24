const {ErrorFormatter, getError} = require("../lib/error");
const CONST = require("../const").APP_CONST;
const {validLimit, validPage} = require("../lib/validNumber");
const Article = require('../models/article');
const HTTP_CODE = CONST.HTTP_CODE;

exports.post = (req, res) =>{
  const {title, body} = req.body;

  const article = new Article({title, body});
  article.save()
    .then(data => res.send(201, data))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(HTTP_CODE.UNPROCESSABLE_INTITY).json(ErrorFormatter(err));
      } else {
        res.status(HTTP_CODE.SERVER_ERROR).json(err);
      }
    });
};

exports.put = (req, res) => {
  const {id} = req.params;
  const {title, body} = req.body;

  Article.findById(id)
    .then(article => {
      Article.findOneAndUpdate({_id: article._id}, {title, body}, { new: true, runValidators: true })
        .then(data => res.send(HTTP_CODE.OK, data))
        .catch(err => {
          if (err.name === 'ValidationError') {
            res.status(HTTP_CODE.UNPROCESSABLE_INTITY).json(ErrorFormatter(err));
          } else {
            res.status(HTTP_CODE.SERVER_ERROR).json(err);
          }
        });
    })
    .catch(err => res.send(HTTP_CODE.NOT_FOUND, [{errors: {field: "id", error: "not found"}}]));
};

exports.getOne = (req, res) => {
  const {id} = req.params;

  Article.findById(id)
    .then(data => res.send(HTTP_CODE.OK, data))
    .catch(err => res.send(HTTP_CODE.NOT_FOUND, ErrorFormatter(err)));
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
    return res.status(HTTP_CODE.UNPROCESSABLE_INTITY).json(ErrorFormatter(objErrors));
  }

  Article.count({}, (err, date) => {
    const count = date;
    const countPage = Math.ceil(count / CONST.MAX_LIMIT);
    if (parseInt(page) > countPage) {
      objErrors.errors.page = getError('page', 'this page number is not exist');
      return res.status(HTTP_CODE.NOT_FOUND).json(ErrorFormatter(objErrors));
    }
    Article.find({},null,{limit: +limit, skip: CONST.MAX_LIMIT * (page - 1)}).sort({_id: -1})
      .then(articles => {
        return res.status(HTTP_CODE.OK).send({
          count,
          page,
          limit: articles.length,
          articles
        });
      })
      .catch(err => res.status(HTTP_CODE.SERVER_ERROR).send(err));
  })
};