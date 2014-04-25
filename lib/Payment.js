var util = require('util');

var parameterHelper = require('./util/ParameterHelper');

function Payment(data) {
    this._value = parameterHelper.ge(data.value, 1);
}

Payment.prototype.value = function() {
    return this._value;
};

Payment.MonthlyPeriodicPayment = 'monthly';
Payment.YearlyPeriodicPayment = 'yearly';
Payment.OneTime = 'oneTime';

module.exports = Payment;