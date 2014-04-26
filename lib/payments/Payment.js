var util = require('util');

var parameterHelper = require('../util/ParameterHelper');

function Payment(data) {
    data = data || {};

    this._value = parameterHelper.ge(data.value, 1);
}

Payment.prototype.value = function() {
    return this._value;
};

Payment.prototype.validatePaymentDate = function(paymentDate) {
    if(!this._validatePaymentDate) throw new Error('_validatePaymentDate not implemented');

    return this._validatePaymentDate(paymentDate);
};

Payment.MonthlyPeriodicPayment = 'monthly';
Payment.YearlyPeriodicPayment = 'yearly';
Payment.OneTime = 'oneTime';

module.exports = Payment;