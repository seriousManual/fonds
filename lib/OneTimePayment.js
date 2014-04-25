var util = require('util');

var moment = require('moment');

var parameterHelper = require('../util/ParameterHelper');

var Payment = require('./Payment');

function OneTimePayment(data) {
    Payment.call(this, data);

    this._date = parameterHelper.validDate(data.date);
}

util.inherits(OneTimePayment, Payment);

OneTimePayment.prototype.date = function() {
    return this._date;
};

module.exports = PeriodicPayment;