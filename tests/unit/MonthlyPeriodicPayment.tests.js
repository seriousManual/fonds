var expect = require('chai').expect;
var moment = require('moment');

var testUtil = require('../util');
var MonthlyPeriodicPayment = require('../../lib/payments/MonthlyPeriodicPayment');

describe('MonthlyPeriodicPayment', function () {
    it('should throw', function () {
        expect(function () {
            new MonthlyPeriodicPayment();
        }).to.throw(/not a number/);
    });

    it('should hold the values (/w end)', function () {
        var a = new MonthlyPeriodicPayment({
            value: 100,
            start: '2014-01-01',
            end: '2014-02-02',
            dates: [1, 2, 3],
            fee: 0
        });

        expect(a.value()).to.equal(100);
        testUtil.dateCheck(a.start(), '2014-01-01');
        testUtil.dateCheck(a.end(), '2014-02-02');
        expect(a.dates()).to.deep.equal([1, 2, 3]);
    });

    it('should validate paymentdate', function () {
        var a = new MonthlyPeriodicPayment({
            value: 100,
            start: '2014-01-01',
            end: '2014-05-31',
            dates: [1, 2, 3],
            fee: 0
        });

        expect(a.validatePaymentDate(moment('2013-12-01'))).to.be.false;

        expect(a.validatePaymentDate(moment('2014-01-01'))).to.be.true;
        expect(a.validatePaymentDate(moment('2014-01-02'))).to.be.true;
        expect(a.validatePaymentDate(moment('2014-01-03'))).to.be.true;
        expect(a.validatePaymentDate(moment('2014-01-04'))).to.be.false;

        expect(a.validatePaymentDate(moment('2014-02-01'))).to.be.true;
        expect(a.validatePaymentDate(moment('2014-03-02'))).to.be.true;
        expect(a.validatePaymentDate(moment('2014-02-03'))).to.be.true;
        expect(a.validatePaymentDate(moment('2014-02-04'))).to.be.false;

        expect(a.validatePaymentDate(moment('2014-06-01'))).to.be.false;
        expect(a.validatePaymentDate(moment('2014-06-02'))).to.be.false;
        expect(a.validatePaymentDate(moment('2014-06-03'))).to.be.false;
        expect(a.validatePaymentDate(moment('2014-06-04'))).to.be.false;
    });
});