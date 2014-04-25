var util = require('util');

var parameterHelper = require('./util/ParameterHelper');

var PeriodicPayment = require('./PeriodicPayment');

function YearlyPeriodicPayment(data) {
    PeriodicPayment.call(this, data);

    this._dates = parameterHelper.isNonEmptyArray(data.dates);
}

util.inherits(YearlyPeriodicPayment, PeriodicPayment);

YearlyPeriodicPayment.prototype.dates = function() {
    return this._dates;
};

module.exports = YearlyPeriodicPayment;