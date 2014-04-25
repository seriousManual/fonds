var util = require('util');

var moment = require('moment');

var parameterHelper = require('./util/ParameterHelper');

var Payment = require('./Payment');

function PeriodicPayment(data) {
    data = data || {};

    Payment.call(this, data);

    this._start = parameterHelper.validDate(data.start);
    this._end = data.end ? moment(data.end) : null;

    if(this._end) {
        parameterHelper.geDate(this._end, this._start);
    }
}

util.inherits(PeriodicPayment, Payment);

PeriodicPayment.prototype.start = function() {
    return this._start;
};

PeriodicPayment.prototype.end = function() {
    return this._end;
};

module.exports = PeriodicPayment;