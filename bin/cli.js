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

var currentValue = args.currentValue || null;

var styles = {
    blank: {
        chars: {
            'top': '-' , 'top-mid': '-' , 'top-left': '+' , 'top-right': '+',
            'bottom': '-' , 'bottom-mid': '+' , 'bottom-left': '+' , 'bottom-right': '+',
            'left': '|' , 'left-mid': '+' , 'mid': '-' , 'mid-mid': '+',
            'right': '|' , 'right-mid': '+' , 'middle': '|'
        },
        style: {
            head: [],
            border: []
        }
    }
};

var style = args.style && styles[args.style];

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
    var options = {
        head: ['', 'comment', 'value (EUR)', 'fee (EUR)']
    };

    if (style) {
        options.chars = style.chars;
        options.style = {};
        options.style.head = style.style.head;
        options.style.border = style.style.border;
    }

    var table = new Table(options);

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
    table.push({'sums': ['', summary.invested, summary.fee]});

    console.log(table.toString());

    if (currentValue) {
        var optionsSummary = {
            chars: {
                'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': '',
                'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': '',
                'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': '',
                'right': '' , 'right-mid': '' , 'middle': ''
            },
            style: {
                head: [],
                border: []
            }
        };
        var table2 = new Table(optionsSummary);

        table2.push(
            { paid: summary.invested },
            { 'total fee': summary.fee },
            { '--------------': '------------'},
            { 'invested': summary.invested - summary.fee },
            { '': '' },
            { 'current value:': currentValue },
            { '% of paid': -1 * (1 - currentValue / summary.invested) },
            { '% of invested': -1 * (1 - currentValue / (summary.invested - summary.fee)) }

        );

        console.log(table2.toString());
    }
});