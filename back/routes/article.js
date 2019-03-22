const Article = require('../models/article');

exports.post = function (req, res) {
  const {title, body} = req.body;

  const errors = Article.validFields(title, body);
  if (errors.length > 0) {
    return res.send(422, {errors});
  }

  const newArticle = new Article({title, body});
  newArticle.save()
    .then(data => res.send(201, data))
    .catch(err => res.send(500, err));
};

exports.put = async function (req, res) {
  const {id} = req.params;
  const {title, body} = req.body;

  const errors = Article.validFields(title, body);
  if (errors.length > 0) {
    return res.send(422, {errors});
  }

  Article.findById(id, function (err, data) {
    if (err) return res.send(404, "id is not exist");

    data.title = title;
    data.body = body;

    data.save(function (err, data) {
      if (err) return res.send(500);
      res.send(200, data);
    })
  })
};

exports.getOne = function (req, res) {
  const {id} = req.params;

  Article.findById(id, function (err, data) {
    if (err) return res.send(404, [{errors: {field: "id", error: "not found"}}]);
    res.send(200, data);
  });
};

exports.getAllByDate = function (req, res) {
  const {pageNumber, limit} = req.params;

  //добавить валидацию параметров

  if
};
