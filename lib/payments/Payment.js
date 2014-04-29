var util = require('util');

var parameterHelper = require('../util/parameterHelper');

function Payment(data) {
    data = data || {};

    this._value = parameterHelper.ge(data.value, 1);
    this._comment = (data.comment || '') + '';
    this._fee = parameterHelper.isFloat(data.fee);
}

Payment.prototype.value = function () {
    return this._value;
};

Payment.prototype.validatePaymentDate = function (paymentDate) {
    if (!this._validatePaymentDate) throw new Error('_validatePaymentDate not implemented');

    return this._validatePaymentDate(paymentDate);
};

Payment.prototype.fee = function () {
    return this._fee;
};

Payment.prototype.comment = function () {
    return this._comment;
};

module.exports = Payment;