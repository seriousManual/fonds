var util = require('util');

var PlanIterator = require('../lib/PlanIterator');

function PlanSummary(plan) {
    this._plan = plan;
}

PlanSummary.prototype.createSummary = function (callback) {
    var invested = 0;
    var fee = 0;

    new PlanIterator()
    .on('payment', function(date, payment) {
        invested += payment.value();
        fee += (payment.value() * payment.fee());
    })
    .on('iterationFinished', function() {
        callback(null, {
            fee: fee,
            invested: invested
        });
    })
    .travers(this._plan);
};

module.exports = PlanSummary;