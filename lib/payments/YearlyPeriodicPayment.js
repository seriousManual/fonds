var util = require('util');

var parameterHelper = require('../util/ParameterHelper');
var PeriodicPayment = require('./PeriodicPayment');

function YearlyPeriodicPayment(data) {
    PeriodicPayment.call(this, data);

    this._dates = this._validateDates(data.dates);
}

util.inherits(YearlyPeriodicPayment, PeriodicPayment);

YearlyPeriodicPayment.prototype.dates = function() {
    return this._dates;
};

YearlyPeriodicPayment.prototype._validateDates = function(dates) {
    dates = parameterHelper.isNonEmptyArray(dates);

    dates.forEach(function(date) {
        date = parameterHelper.isNonEmptyArray(date);

        parameterHelper.ge(date[0], 1);
        parameterHelper.ge(date[1], 1);
    });

    return dates.map(function(date) {
        return date[0] + '_' + date[1];
    });
};

YearlyPeriodicPayment.prototype._validatePaymentDate  = function(paymentDate) {
    if (!this.validateDuration(paymentDate)) return false;

    var testConstruct = +paymentDate.format('D') + '_' + +paymentDate.format('MM');

    return this._dates.indexOf(testConstruct) >= 0;
};

YearlyPeriodicPayment.prototype.key = function() {
    return YearlyPeriodicPayment.KEY;
};

YearlyPeriodicPayment.KEY = 'yearly';

module.exports = YearlyPeriodicPayment;