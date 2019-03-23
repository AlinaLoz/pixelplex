module.exports = function(app) {
  app.post('/api/v1/articles', require('./article').post);
  app.put('/api/v1/articles/:id', require('./article').put);
  app.get('/api/v1/articles', require('./article').getAll);
  app.get('/api/v1/articles/:id', require('./article').getOne);
};
