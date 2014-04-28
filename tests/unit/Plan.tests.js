var expect = require('chai').expect;

var Plan = require('../../lib/Plan');

var MonthlyPeriodicPayment = require('../../lib/payments/MonthlyPeriodicPayment');
var YearlyPeriodicPayment = require('../../lib/payments/YearlyPeriodicPayment');
var OneTimePayment = require('../../lib/payments/OneTimePayment');

describe('Plan', function () {
    it('should throw', function () {
        expect(function () {
            new Plan();
        }).to.throw(/undefined value not allowed/);

        expect(function () {
            new Plan({});
        }).to.throw(/undefined value not allowed/);

        expect(function () {
            new Plan({
                start: '2014-01-01'
            });
        }).to.throw(/not an array: undefined/);

        expect(function () {
            new Plan({
                start: '2014-01-01',
                payments: []
            });
        }).to.throw(/empty array not allowed/);

        expect(function () {
            new Plan({
                start: '2014-01-01',
                end: '2010-01-01',
                payments: [
                    {
                        type: 'monthly',
                        start: '2014-01-01',
                        dates: [1, 15],
                        value: 100,
                        fee: 0
                    }
                ]
            });
        }).to.throw(/2010-01-01 should be greater\/equals 2014-01-01/);

        expect(function () {
            new Plan({
                start: '2014-01-01',
                end: '2010-01-01',
                payments: [
                    {
                        type: 'foo'
                    }
                ]
            });
        }).to.throw(/could not identify payment of type: foo/);
    });

    it('should create payments', function () {
        var a = new Plan({
            start: '2014-01-01',
            payments: [
                {
                    type: 'monthly',
                    start: '2014-01-01',
                    dates: [1, 15],
                    value: 10,
                    fee: 0
                },
                {
                    type: 'yearly',
                    start: '2014-01-01',
                    dates: [
                        [1, 1]
                    ],
                    value: 100,
                    fee: 0
                },
                {
                    type: 'oneTime',
                    date: '2014-01-01',
                    value: 1000,
                    fee: 0
                }
            ]
        });

        var payments = a.payments();

        expect(payments[0]).to.be.instanceOf(MonthlyPeriodicPayment);
        expect(payments[1]).to.be.instanceOf(YearlyPeriodicPayment);
        expect(payments[2]).to.be.instanceOf(OneTimePayment);
    });
});