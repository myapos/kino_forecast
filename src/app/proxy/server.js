import express from 'express';
import httpProxy from 'http-proxy';
import bodyParser from 'body-parser';
import cors from 'cors';

// var apiForwardingUrl = 'http://api.open-notify.org/astros.json?';
var apiForwardingUrl = 'https://applications.opap.gr/DrawsRestServices/kino/drawDate/25-02-2017.json?';

// Solution for forwarding from http to https taken from:
// http://stackoverflow.com/questions/15801014/how-to-use-node-http-proxy-for-http-to-https-routing
var proxyOptions = {
    changeOrigin: true
};

httpProxy.prototype.onError = function (err) {
    console.log(err);
};

var apiProxy = httpProxy.createProxyServer(proxyOptions);

console.log('Forwarding API requests to ' + apiForwardingUrl);

// Node express server setup.
var server = express();
server.use(cors());
server.set('port', 3000);
// server.use(express.static(__dirname + '/app'));

server.all("/space/*", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

server.get('/', (req, res) => res.send('Hello World!'))

// Start Server.
server.listen(server.get('port'), function() {
    console.log('Express server listening on port ' + server.get('port'));
});