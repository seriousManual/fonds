var Emitter = require('events').EventEmitter;
var util = require('util');

var moment = require('moment');

function PlanIterator() {
    Emitter.call(this);
}

util.inherits(PlanIterator, Emitter);

PlanIterator.prototype.travers = function (plan) {
    var that = this;
    var start = plan.start().clone();
    var end = plan.end() || moment();

    var currentDate = start;

    while (end.isAfter(currentDate, 'days')) {
        plan.payments().forEach(function (payment) {
            if (payment.validatePaymentDate(currentDate)) {
                that.emit('payment', currentDate, payment);
            }
        });

        currentDate.add(1, 'day');
    }

    this.emit('iterationFinished');
};

module.exports = PlanIterator;