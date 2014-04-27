var http = require('http');
var spawn = require('child_process').spawn;

var args = require('optimist').argv;

var port = args.port || 8080;

http.createServer(function(rew, res) {
    spawn('node', ['./bin/cli.js', './config/user.mer.js', '--style', 'blank'], {
        cwd: process.cwd(),
        env: process.env
    }).stdout.pipe(res);
}).listen(port);