module.exports = function(app) {
  app.post('/api/v1/articles', require('./article').post);
  app.put('/api/v1/articles/:id', require('./article').put);
  app.get('/api/v1/articles?page=:pageNumber&limit=:limit', require('./article').getAllByDate);
  app.get('/api/v1/articles/:id', require('./article').getOne);
};

//подумать над ошибками!!!одинаковая структура