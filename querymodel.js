var connection = require('./connection');
 
function querymodel() {
	this.get = function(req,res){
		var id = req.id;
		console.log("Fecting data from data base......");
    connection.acquire(function(err, con) {
			if(err){

	     //	res.send({status: 200 , message: "Client Error detected"});
			}
      var query = con.query('SELECT * FROM product where id ='+id);

	 query.on("row", function (row, result) {
			    result.addRow(row);
	});

	query.on("end", function (result) {
		 	   res.send({status:200 , message: JSON.stringify(result.rows)});
			   con.end();
	});

    });
  };
  
  this.create = function(req, res) {
    connection.acquire(function(err, con) {
     con.query('INSERT INTO product(id , name) values($1 , $2)', [req.id,req.name],function(err, result) {
        if(err) {
          res.send({status: 1, message: 'insertion failed'});
        }else {
          res.send({status: 0, message: 'inserted successfully'});
        }
      });
    });
  };
  
  this.update = function(req, res) {
    connection.acquire(function(err, con) {
      con.query('UPDATE product set name=($2) where id =($1)', [req.id, req.name], function(err, result) {
        if (err) {
          res.send({status: 1, message: 'update failed'});
        } else {
          res.send({status: 0, message: 'updated successfully'});
        }
      });
    });
  };
  
  this.delete = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('DELETE FROM product where id = ($1)', [id], function(err, result) {
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
