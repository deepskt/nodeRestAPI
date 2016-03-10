var todo = require('./querymodel');
 
module.exports = {
  configure: function(app) {
    app.get('/api/get', function(req,res) {
      todo.get(req,res);
    });
 
    app.post('/api/add', function(req, res) {
      todo.create(req.body, res);
    });
 
    app.put('/api/edit', function(req, res) {
      todo.update(req.body, res);
    });
 
    app.delete('/api/delete/:id/', function(req, res) {
      todo.delete(req.params.id, res);
    });
  }
};
