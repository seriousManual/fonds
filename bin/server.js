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

http.createServer(function(rew, res) {
    spawn('node', ['./bin/cli.js', plan, '--style', 'blank'], {
        cwd: process.cwd(),
        env: process.env
    }).stdout.pipe(res);
}).listen(port);