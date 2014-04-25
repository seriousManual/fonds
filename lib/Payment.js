var util = require('util');

var parameterHelper = require('./util/ParameterHelper');

function Payment(data) {
    data = data || {};

    this._value = parameterHelper.ge(data.value, 1);
}

Payment.prototype.value = function() {
    return this._value;
};

Payment.prototype.validatePayment = function(payment) {
    if(!this._validatePayment) throw new Error('_validatePayment not implemented');

    return this._validatePayment()
};

Payment.MonthlyPeriodicPayment = 'monthly';
Payment.YearlyPeriodicPayment = 'yearly';
Payment.OneTime = 'oneTime';

module.exports = Payment;