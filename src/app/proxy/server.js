import express from "express";
import httpProxy from "http-proxy";
import bodyParser from "body-parser";
import cors from "cors";
import fetch from "node-fetch";
import { kinoUrl, baseKinoUrl } from "./server_constants";

// import * as utils from '../utils';

// https://codeburst.io/using-nodejs-as-a-proxy-for-angularjs-ajax-requests-8e5e94203e0d
// https://codeforgeek.com/2015/12/reverse-proxy-using-expressjs/
// http://thecodebarbarian.com/building-your-own-load-balancer-with-express-js

// old url api

// https://applications.opap.gr/DrawsRestServices/kino/drawDate/24-02-2017.json

// Solution for forwarding from http to https taken from:
// http://stackoverflow.com/questions/15801014/how-to-use-node-http-proxy-for-http-to-https-routing

const proxyOptions = {
  changeOrigin: true,
  proxyTimeout: 5000
  // ws: true,
};

httpProxy.prototype.onError = function(err, req, res) {
  console.log("error: ", err);
  res.json({
    draws: {
      draw: [
        {
          drawTime: "Proxy timeout",
          drawNo: "Proxy timeout",
          results: [-1]
        }
      ]
    }
  });
  res.end();
};

const apiProxy = httpProxy.createProxyServer(proxyOptions);

console.log(`Forwarding API requests to ${kinoUrl}`);

// Node express server setup.
const server = express();
server.use(cors());
server.set("port", 3000);
// server.use(express.static(__dirname + '/app'));

server.all("/getHistoryResults*", (req, res) => {
  // console.log('req:', req.query);
  // setTimeout(() => {
  apiProxy.web(req, res, { target: `${baseKinoUrl}${req.query.date}.json?` });
  // }, 2000);
});

server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true
  })
);

server.get("/", (req, res) => res.send("Hello World!"));

server.get("/getData", (req, res) => {
  const { date } = req.query;
  console.log("date", date);

  // console.log("date:", date);
  const apiUrl = `https://api.opap.gr/draws/v3.0/1100/draw-date/${date}/${date}`;
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      // res.redirect('/error');
      console.log("error:", err);
    });

  // return res.send("Hello World!");
});
// Start Server.
server.listen(server.get("port"), () => {
  console.log(`Express server listening on port ${server.get("port")}`);
});
