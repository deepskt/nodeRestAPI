var WebSocketServer = require("ws").Server
var http = require("http")
var express = require('express');
var bodyparser = require('body-parser');
var port = process.env.PORT || 5000 
var connection = require('./connection');
var routes = require('./routes');
 
var allowCrossDomain = function(req, res, next) {
	    res.header('Access-Control-Allow-Origin', '*');
		    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
			  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
				    // intercept OPTIONS method
				    if('OPTIONS' == req.method) {
				      res.send(200);
				      }else {
						next();
					  }
};

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(allowCrossDomain);
connection.init();
routes.configure(app);
var server = http.createServer(app);

server.listen(port, function() {
  console.log('Server listening on port ' + server.address().port);
});

var wss = new WebSocketServer({server: server});
console.log("websocket server created");
wss.on("connection", function(ws) {
	var id = setInterval(function() {
		ws.send(JSON.stringify(new Date()), function() {  })
	}, 1000);
	console.log("websocket connection open");
	ws.on("close", function() {
	console.log("websocket connection close");
	clearInterval(id);
	})
});
