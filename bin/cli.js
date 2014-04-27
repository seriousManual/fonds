var fs = require('fs');
var path = require('path');

var args = require('optimist').argv;
var Table = require('cli-table');

var Plan = require('../lib/Plan');
var Summary = require('../lib/Summary');

var configFile = args._[0];

if (!configFile) {
    console.log('missing config file');
    process.exit(1);
}

var plan, data;
try {
    if (configFile.match(/\.json/)) {
        data = fs.readFileSync(configFile).toString();
        data = JSON.parse(data);
    } else {
        data = require(path.join(process.cwd(), configFile));
    }

    plan = new Plan(data);
} catch(error) {
    console.log('plan definition error: ' + error.message);
    process.exit(1);
}

new Summary(plan)
.createSummary(function(error, summary) {
    var table = new Table({
        head: ['', 'comment', 'value (€)', 'fee (€)']
    });

    summary.payments.forEach(function(payment) {
        var row = {};
        row[payment.date] = [
            payment.comment,
            payment.value,
            payment.fee
        ];

        table.push(row);
    });

    table.push([]);
    table.push({'sum': ['', summary.invested, summary.fee]})

    console.log(table.toString());
});