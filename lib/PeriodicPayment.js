var moment = require('moment');

var parameterHelper = require('../util/ParameterHelper');

function PeriodicPayment(data) {
    this.start = parameterHelper.validDate(data.start);
    this.end = data.end ? moment(data.end) : null;
}

module.exports = PeriodicPayment;