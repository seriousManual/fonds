var util = require('util');

var PlanIterator = require('../lib/PlanIterator');

function PlanSummary(plan) {
    this._plan = plan;
}

PlanSummary.prototype.createSummary = function (callback) {
    var paid = 0;
    var fee = 0;
    var payments = [];

    new PlanIterator()
        .on('payment', function (date, payment) {
            payments.push({
                value: payment.value(),
                fee: (payment.value() * payment.fee()),
                comment: payment.comment(),
                date: date.format('YYYY-MM-DD'),
                interval: payment.key()
            });

            paid += payment.value();
            fee += (payment.value() * payment.fee());
        })
        .on('iterationFinished', function () {
            callback(null, {
                fee: fee,
                paid: paid,
                invested: paid - fee,
                payments: payments
            });
        })
        .travers(this._plan);
};

module.exports = PlanSummary;