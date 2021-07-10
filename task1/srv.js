import http from 'http';
import https from 'https';
// import request from 'request';
// import querystring from 'querystring';
import var1 from './var1.js';
import var2 from './var2.js';


http.createServer(function (req, res) {
  
  let route = minHtml;
  if (req.url=="/1") route = var1
  else if (req.url=="/2") route = var2
  
  checkGatwayAvailability(route).then(result => {
    //console.log(result);
    res.writeHead(200, {      
      'Content-Type': 'text/html',
      'Content-Length': result.length,
      'Expires': new Date().toUTCString()
    });
    res.end(result);
  }).catch(err => {console.log(err)});
  
}).listen(8081);

function checkGatwayAvailability(callback) {
  return new Promise((resolve, reject) => {
    callback(resolve);
  });
}



function minHtml(callback) {
  let header = '404';
  let body = '404';
  let out =  '<!DOCTYPE html>' + '<html><head>' + header + '</head><body>' + body + '</body></html>';
  callback(out);
  return out;
};

