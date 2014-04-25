var m = require('moment');
var args = require('optimist').argv;

var firstInvestmentDate = m('03.01.2014');
var startThisMonth = m().startOf('month');
var midThisMonth = startThisMonth.add('days', 15);

var elapsedMonth = firstInvestmentDate.diff(startThisMonth, 'month');


var investedMoney = 0;

//past investments
investedMoney += elapsedMonth * 150;

//investmentOfCurrentMonth
investedMoney += 100;

//investment on mid of month
if(m() > midThisMonth) {
    investedMoney += 50;
}

if(!args._[0]) {
    throw new Error('no rent');
}

var currentState = args._[0];

console.log('Invested: ' + investedMoney + '€');
if(currentState < investedMoney) {
    console.log( '-' + (((investedMoney / currentState) - 1) * 100) + '%' );
} else {
    console.log('+' + (((currentState / investedMoney) - 1) * 100) + '%');
}

