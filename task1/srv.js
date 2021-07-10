import http from 'http';
import https from 'https';
// import request from 'request';
// import querystring from 'querystring';
import var1 from './var1.js';
import var2 from './var2.js';

const serverPort = 8081;
const serverHost = '127.0.0.1'

http.createServer(function (req, res) {
  
  let route = minHtml;
  if (req.url=="/1") route = var1
  else if (req.url=="/2") route = var2
  
  checkGatwayAvailability(route).then(result => {
    //console.log(result);
    res.writeHead(200, {      
      'Content-Type': 'text/html',
      'Content-Length': Buffer.byteLength(result),
      'Expires': new Date().toUTCString()
    });
    res.end(result);
  }).catch(err => {console.log(err)});
  
}).listen(serverPort,serverHost,() => console.log(`Server running at http://${serverHost}:${serverPort}/`));

function checkGatwayAvailability(callback) {
  return new Promise((resolve, reject) => {
    callback(resolve);
  });
}



function minHtml(callback) {
  let header = '<title>404</title>';
  let body = '<a href="/1">exchange rates 1</a></br><a href="/2">exchange rates 2</a>';
  let out =  '<!DOCTYPE html>' + '<html><head>' + header + '</head><body>' + body + '</body></html>';
  callback(out);
  return out;
};

