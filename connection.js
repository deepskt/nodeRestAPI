var pgp = require("pg-promise")(/*options*/);
var pg  = require("pg");
function Connection() {
		this.init = function() {
				this.getClient = function(client){
					pg.connect("postgres://postgres:postgres@localhost:5432/postgres"+'?ssl=true', function(err, client) {
						if (err) throw err;
							console.log('Connected to postgres! Getting schemas...');
					});
				console.log("Connection succesfull... client detecting... ");	   	
				return client;
				};
			};
			this.acquire = function(callback){
			//	  pg.connect("postgres://postgres:postgres@localhost:5432/postgres"+'?ssl=true', function(err, client) {
				  pg.connect("postgres://gnscesisnamzhz:3oUeMP_-wHWOwxmqolwa0YW6oa@ec2-54-83-3-38.compute-1.amazonaws.com:5432/dbggfoq2oqp265" + '?ssl=true', function(err, client) { 
					if (err) throw err;
					console.log('Connected to postgres! Getting schemas...');
					callback(err,client);
			});
			};
		}
		module.exports = new Connection();
	
