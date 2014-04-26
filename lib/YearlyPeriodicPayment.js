var util = require('util');

var parameterHelper = require('./util/ParameterHelper');

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

    return dates;
};

module.exports = YearlyPeriodicPayment;