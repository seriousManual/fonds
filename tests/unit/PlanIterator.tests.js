var expect = require('chai').expect;
var moment = require('moment');

var PlanIterator = require('../../lib/PlanIterator');

function createPlanMock(start, end, payments) {
    return {
        start: function () {
            return start
        },
        end: function () {
            return end
        },
        payments: function () {
            return payments
        }
    };
}

function createPaymentMock(validations) {
    var index = 0;

    return {
        calls: [],
        validatePaymentDate: function (date) {
            this.calls.push(date.format('YYYY-MM-DD'))

            return validations[index++];
        }
    };
}

describe('planIterator', function () {
    it('should itarate from start to end', function (done) {
        var a = new PlanIterator();
        var paymentMock = createPaymentMock([false, false, true, false, false]);
        var planMock = createPlanMock(
            moment('2014-01-01'),
            moment('2014-01-05'),
            [paymentMock]
        );

        var payments = [];
        var dates = [];

        a.on('payment', function (date, payment) {
            payments.push(payment);
            dates.push(date.format('YYYY-MM-DD'));
        });

        a.on('iterationFinished', function () {
            expect(payments).to.deep.equal([paymentMock]);
            expect(dates).to.deep.equal(['2014-01-03']);

            expect(paymentMock.calls).to.deep.equal([
                '2014-01-01',
                '2014-01-02',
                '2014-01-03',
                '2014-01-04',
                '2014-01-05'
            ]);

            done()
        });

        a.travers(planMock);

    });

    it('should itarate until now', function (done) {
        var now = moment();
        var start = moment().subtract(3, 'days');
        var expected = [];

        var current = start.clone();
        while (now.isAfter(current, 'days') || now.isSame(current, 'days')) {
            expected.push(current.format('YYYY-MM-DD'));

            current.add(1, 'day');
        }

        var a = new PlanIterator();
        var paymentMock = createPaymentMock([true, false, false, false, false]);
        var planMock = createPlanMock(
            start,
            null,
            [paymentMock]
        );

        var payments = [];
        var dates = [];

        a.on('payment', function (date, payment) {
            payments.push(payment);
            dates.push(date.format('YYYY-MM-DD'));
        });

        a.on('iterationFinished', function () {
            expect(payments).to.deep.equal([paymentMock]);
            expect(dates).to.deep.equal([start.format('YYYY-MM-DD')]);

            expect(paymentMock.calls).to.deep.equal(expected);

            done()
        });

        a.travers(planMock);

    });
});