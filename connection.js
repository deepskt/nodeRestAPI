		var pgp = require("pg-promise")(/*options*/);
		var pg = require("pg");
		function Connection() {
			this.init = function() {
			/*var db = pgp("postgres://gnscesisnamzhz:3oUeMP_-wHWOwxmqolwa0YW6oa@ec2-54-83-3-38.compute-1.amazonaws.com:5432/dbggfoq2oqp265");
		
				db.one("SELECT $1 AS value", 123)
				.then(function (data) {	
					console.log("Testing DATA Response:", data.value);
				})
				.catch(function (error) {	
					console.log("ERROR:", error);
				});
				**/
			//	pg.connect(process.env.DATABASE_URL + '?ssl=true', function(err, client) {
			//	pg.connect("postgres://gnscesisnamzhz:3oUeMP_-wHWOwxmqolwa0YW6oa@ec2-54-83-3-38.compute-1.amazonaws.com:5432/dbggfoq2oqp265" + '?ssl=true', function(err, client) {
			this.getClient = function(client){
	//		pg.connect("postgres://postgres:postgres@localhost/postgres", function(err, client) {
			pg.connect("postgres://gnscesisnamzhz:3oUeMP_-wHWOwxmqolwa0YW6oa@ec2-54-83-3-38.compute-1.amazonaws.com:5432/dbggfoq2oqp265" + '?ssl=true', function(err, client) {	
				if (err) throw err;
				console.log('Connected to postgres! Getting schemas...');
			client
			.query('SELECT table_schema,table_name FROM information_schema.tables;')
			.on('row', function(row) {
				console.log(JSON.stringify(row));
				});
				}); 
			return client;
			};
			};

			this.acquire = function(callback){
				this.getClient(function(err, client){
				callback(err,client);
				});
			};
		}
		module.exports = new Connection();
	
