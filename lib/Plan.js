var parameterHelper = require('./util/ParameterHelper');
var paymentBuilder = require('./PaymentBuilde');

function Plan(data) {
    data = data || {};

    this._start = parameterHelper.validDate(data.start);
    this._end = data.end ? parameterHelper.validDate(data.end) : null;
    this._payments = this._validatePayments(data.payments);

    if(this._end) {
        parameterHelper.geDate(this._end, this._start);
    }
}

Plan.prototype._validatePayments = function(payments) {
    return parameterHelper
        .isNonEmptyArray(payments)
        .map(paymentBuilder.identifyPayment);
};

Plan.prototype.start = function() {
    return this._start;
};

Plan.prototype.end = function() {
    return this._end;
};

Plan.prototype.payments = function() {
    return this._payments;
};

module.exports = Plan;