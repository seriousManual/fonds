var util = require('util');

var parameterHelper = require('../util/parameterHelper');
var PeriodicPayment = require('./PeriodicPayment');

function MonthlyPeriodicPayment(data) {
    PeriodicPayment.call(this, data);

    this._dates = parameterHelper.isNonEmptyArray(data.dates);
}

util.inherits(MonthlyPeriodicPayment, PeriodicPayment);

MonthlyPeriodicPayment.prototype.dates = function () {
    return this._dates;
};

MonthlyPeriodicPayment.prototype._validatePaymentDate = function (paymentDate) {
    if (!this.validateDuration(paymentDate)) return false;

    return this._dates.indexOf(+paymentDate.format('D')) >= 0;
};

MonthlyPeriodicPayment.prototype.key = function () {
    return MonthlyPeriodicPayment.KEY;
};

MonthlyPeriodicPayment.KEY = 'monthly';

module.exports = MonthlyPeriodicPayment;