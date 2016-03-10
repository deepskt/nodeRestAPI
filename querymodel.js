var connection = require('./connection');
 
function querymodel() {
	this.get = function(req,res){
    connection.acquire(function(err, con) {
      con.query('SELECT *FROM product;', req, function(err, result) {
        res.send(result);
      });
    });
  };
  
  this.create = function(req, res) {
    connection.acquire(function(err, con) {
      con.query('insert into product set ?', req, function(err, result) {
        if (err) {
          res.send({status: 1, message: 'TODO insertion failed'});
        } else {
          res.send({status: 0, message: 'TODO inserted successfully'});
        }
      });
    });
  };
  
  this.update = function(req, res) {
    connection.acquire(function(err, con) {
      con.query('update product set ? where id = ?', [req, req.id], function(err, result) {
        if (err) {
          res.send({status: 1, message: 'TODO update failed'});
        } else {
          res.send({status: 0, message: 'TODO updated successfully'});
        }
      });
    });
  };
  
  this.delete = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('delete from product where id = ?', [id], function(err, result) {
        if (err) {
          res.send({status: 1, message: 'Failed to delete'});
        } else {
          res.send({status: 0, message: 'Deleted successfully'});
        }
      });
    });
  };
	 
}
module.exports = new querymodel();
