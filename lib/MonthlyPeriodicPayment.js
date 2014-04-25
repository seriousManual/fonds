var util = require('util');

var parameterHelper = require('./util/ParameterHelper');
var PeriodicPayment = require('./PeriodicPayment');

function MonthlyPeriodicPayment(data) {
    PeriodicPayment.call(this, data);

    this._dates = parameterHelper.isNonEmptyArray(data.dates);
}

util.inherits(MonthlyPeriodicPayment, PeriodicPayment);

MonthlyPeriodicPayment.prototype.dates = function() {
    return this._dates;
};

module.exports = MonthlyPeriodicPayment;