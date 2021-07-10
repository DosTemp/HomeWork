import http from 'http';
import https from 'https';
// import request from 'request';
import querystring from 'querystring';

export default function var1 (callback) {
    let curDate = (new Date()).toISOString().slice(0,10);
    https.get('https://www.nbrb.by/api/exrates/rates?ondate='+curDate+'&periodicity=0', (resp) => {
      let data = '';
  
      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      function formatData(JSONdata){
        let body = '';
        JSONdata.forEach(element => {
          body = body + '<tr><td>'
          +element.Cur_Name+'</td><td>'
          +element.Cur_Scale+' '+element.Cur_Abbreviation+'</td><td>'
          +element.Cur_OfficialRate+'</td></tr>'
        });
        let out =  '<!DOCTYPE html>' 
        + '<html><head><meta charset="utf-8" /></head><body><table>'
        +'<tr><th>Наименование иностранной валюты	</th>'
        +'<th>Количество единиц иностранной валюты, буквенный код валюты</th>'
        +'<th>Официальный курc</th></tr>' 
        + body + '</table></body></html>';
        return out;

      }
  
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        // console.log(JSON.parse(data).explanation);
        callback(formatData(JSON.parse(data)));
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