var fs = require('fs');
var path = require('path');

var args = require('optimist').argv;
var Table = require('cli-table');

var Plan = require('../lib/Plan');
var Summary = require('../lib/Summary');

var configFile = args._[0];

var plan;
try {
    if (!configFile) throw new Error('config file missing');

    plan = new Plan(loadData(configFile));
} catch (error) {
    console.log('initialization: ' + error.message);
    process.exit(1);
}

var currentValue = args.currentValue || null;

var blankStyle = {
    chars: {
        'top': '-', 'top-mid': '-', 'top-left': '+', 'top-right': '+',
        'bottom': '-', 'bottom-mid': '+', 'bottom-left': '+', 'bottom-right': '+',
        'left': '|', 'left-mid': '+', 'mid': '-', 'mid-mid': '+',
        'right': '|', 'right-mid': '+', 'middle': '|'
    },
    style: {
        head: [],
        border: []
    }
};

new Summary(plan)
    .createSummary(function (error, summary) {
        printDetailTable(summary, args.blank ? blankStyle : null);

        if (currentValue) {
            printSummary(summary, currentValue);
        }
    });

function printDetailTable(summary, style) {
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

    summary.payments.forEach(function (payment) {
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
}

function printSummary(summary, currentValue) {
    var optionsSummary = {
        chars: {
            'top': '', 'top-mid': '', 'top-left': '', 'top-right': '',
            'bottom': '', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': '',
            'left': '', 'left-mid': '', 'mid': '', 'mid-mid': '',
            'right': '', 'right-mid': '', 'middle': ''
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
        { '% of paid': beautify(percChange(currentValue, summary.invested)) + '%' },
        { '% of invested': beautify(percChange(currentValue, summary.invested - summary.fee)) + '%'}
    );

    console.log(table2.toString());
}

function loadData(inputPath) {
    var configFilePath;
    if (fs.existsSync(path.join(process.cwd(), inputPath))) {
        configFilePath = path.join(process.cwd(), inputPath);
    } else if (fs.existsSync(inputPath)) {
        configFilePath = inputPath;
    }

    if (!configFilePath) {
        throw new Error('config not found: ' + inputPath);
    }

    if (configFilePath.match(/\.json/)) {
        data = fs.readFileSync(configFilePath).toString();
        data = JSON.parse(data);
    } else {
        data = require(configFilePath);
    }

    return data;
}

function percChange(value, base) {
    return (-1 * (1 - value / base)) * 100;
}

function beautify(value) {
    return Math.round(value * 100) / 100;
}