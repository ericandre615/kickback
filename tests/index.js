var http = require('http'),
    fs = require('fs');

    http.createServer(function(req, res) {
        res.writeHead(200, {
            'content-type':'application/json',
            'access-control-allow-origin':'*',
            'access-control-allow-headers':'content-type'
        });
        fs.createReadStream(__dirname+'/data.json').pipe(res);
    }).listen(8080, '127.0.0.1');
