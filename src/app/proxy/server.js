import express from 'express';
import httpProxy from 'http-proxy';
import bodyParser from 'body-parser';
import cors from 'cors';
import { kinoUrl } from './server_constants';
import { baseKinoUrl } from './server_constants';
import { generateDates } from './server_utils/generateDates';
import { formatDate } from './server_utils/formatDate';


// import * as utils from '../utils';

// https://codeburst.io/using-nodejs-as-a-proxy-for-angularjs-ajax-requests-8e5e94203e0d

// var apiForwardingUrl = 'https://applications.opap.gr/DrawsRestServices/kino/drawDate/25-02-2017.json?';

// Solution for forwarding from http to https taken from:
// http://stackoverflow.com/questions/15801014/how-to-use-node-http-proxy-for-http-to-https-routing
const proxyOptions = {
  changeOrigin: true,
};

httpProxy.prototype.onError = function (err) {
  console.log(err);
};

const apiProxy = httpProxy.createProxyServer(proxyOptions);

console.log('Forwarding API requests to ' + kinoUrl);

// Node express server setup.
const server = express();
server.use(cors());
server.set('port', 3000);
// server.use(express.static(__dirname + '/app'));

server.all('/getHistoryResults/*', (req, res) => {
  const dates = generateDates();
  // console.log('formated date:', formatDate(dates[0]));
  // console.log('log:', dates[0]);
  const formattedDates = dates.map(date => formatDate(date));

  // console.log('log:', formattedDates);
  apiProxy.web(req, res, { target: kinoUrl });
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true,
}));

server.get('/', (req, res) => res.send('Hello World!'))

// Start Server.
server.listen(server.get('port'), () => {
  console.log(`Express server listening on port ${server.get('port')}`);
});
