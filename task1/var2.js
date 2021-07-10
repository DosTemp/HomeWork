import https from 'https';
import querystring from 'querystring';

export default function (callback) {
    var postData = querystring.stringify({
        // 'Date':'2021-07-12',
        'Date':'12.07.2021',
        'Type':'Day',
        'X-Requested-With':'XMLHttpRequest'
    });

    var options = {
    //   hostname: 'ptsv2.com',path: '/t/adl2y-1625943477/post',
    hostname: 'www.nbrb.by',path: '/statistics/rates/ratesdaily.asp',
    port: 443,
    
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
        }
    };



    var str ="";
    var resolv=null;
    var req = https.request(options, (res) => {

        res.on('data', (d) => {
            str += d;
            // process.stdout.write(d);
            // fs.appendFileSync("/usercode/index.html",d)
        });
    
        res.on('end', function () {
            // console.log("req.data: "+req.data);
            // console.log("str: "+str);
            let out =  '<!DOCTYPE html>' 
            + '<html><head>Var2</head><body>' 
            + str + '</body></html>';
            callback(out) 
            return out
        });
    });
    
    req.on('error', (e) => {
    console.error(e);
    })
    req.write(postData);
    req.end();
    
}