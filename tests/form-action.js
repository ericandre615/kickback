var http = require('http');

    http.createServer(function(req, res) {
        res.writeHead(200, {
            'content-type':'application/json',
            'access-control-allow-origin':'*',
            'access-control-allow-headers':'content-type'
        });
        var resData = req.on('data', function(data) {
            var arr = data.toString().split('&');
            var dataObj = {};
            arr.forEach(function(item) {
                var pow = item.split('=');
                dataObj[decodeURIComponent(pow[0])] = decodeURIComponent(pow[1]);
            });
            res.write(JSON.stringify(dataObj));
            res.end();
        });
    }).listen(8080, '127.0.0.1');
