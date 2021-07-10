import http from 'http';
import https from 'https';
// import request from 'request';
import querystring from 'querystring';

export default function var1 (callback) {
    let url = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';

    https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
      let data = '';
  
      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        data += chunk;
      });
  
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        // console.log(JSON.parse(data).explanation);
        callback(JSON.parse(data).explanation);
        return JSON.parse(data).explanation
        
      });
  
    }).on('error', (err) => {
      console.log('Error: ' + err.message);
    });

    // request.post(url, (err, res, body) => {
    //   if (err) reject(err);
    //   resolve(body);
    // });
}