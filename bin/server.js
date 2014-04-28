var url = require('url');
var http = require('http');
var spawn = require('child_process').spawn;
var fs = require('fs');

var args = require('optimist').argv;

var port = args.port || 8080;
var plan = args.plan;

if (!plan || !fs.existsSync(plan)) {
    console.log('plan not found or plan invalid: ' + plan);
    process.exit(1);
}

http.createServer(function(req, res) {
    if (req.url === '/favicon.ico') {
        res.writeHead(404);
        res.end();
    }

    var params = ['./bin/cli.js', plan, '--blank'];

    var query = getQuery(req.url);
    if(query.currentValue) {
        params.push('--currentValue', query.currentValue);
    }

    spawn('node', params, {
        cwd: process.cwd(),
        env: process.env
    }).stdout.pipe(res);
}).listen(port);

function getQuery(requestUrl) {
    var url_parts = url.parse(requestUrl, true);
    return url_parts.query;
}

console.log('running on: ' + port);