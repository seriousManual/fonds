var expect = require('chai').expect;
var moment = require('moment');

var YearlyPeriodicPayment = require('../../lib/payments/YearlyPeriodicPayment');

describe('YearlyPeriodicPayment', function() {
    it('should throw', function() {
        expect(function() {
            new YearlyPeriodicPayment();
        }).to.throw(/not a number/);
    });

    it('should throw', function() {
        expect(function() {
            new YearlyPeriodicPayment({
                value: 100,
                start: '2014-01-01',
                end: '2014-02-01',
                dates: [1, 2, 3]
            });
        }).to.throw(/not an array: 1/);
    });

    it('should throw', function() {
        expect(function() {
            new YearlyPeriodicPayment({
                value: 100,
                start: '2014-01-01',
                end: '2014-02-01',
                dates: [['foo']]
            });
        }).to.throw(/not a number: foo/);
    });

    it('should throw', function() {
        expect(function() {
            new YearlyPeriodicPayment({
                value: 100,
                start: '2014-01-01',
                end: '2014-02-01',
                dates: [[1]]
            });
        }).to.throw(/not a number: undefined/);
    });

    it('should hold the values (/w end)', function() {
        var a = new YearlyPeriodicPayment({
            value: 100,
            start: '2010-01-01',
            end: '2012-12-31',
            dates: [[1, 6], [3, 11]]
        });

        expect(a.value()).to.equal(100);
        expect(a.start().isValid()).to.be.true;
        expect(a.end().isValid()).to.be.true;
        expect(a.dates()).to.deep.equal(['1_6', '3_11']);

        expect(a.validatePaymentDate(moment('2010-01-01'))).to.be.false;
        expect(a.validatePaymentDate(moment('2011-03-19'))).to.be.false;
        expect(a.validatePaymentDate(moment('2012-11-25'))).to.be.false;

        expect(a.validatePaymentDate(moment('2010-06-01'))).to.be.true;
        expect(a.validatePaymentDate(moment('2011-06-01'))).to.be.true;
        expect(a.validatePaymentDate(moment('2012-06-01'))).to.be.true;
        expect(a.validatePaymentDate(moment('2010-11-03'))).to.be.true;
        expect(a.validatePaymentDate(moment('2011-11-03'))).to.be.true;
        expect(a.validatePaymentDate(moment('2012-11-03'))).to.be.true;

        expect(a.validatePaymentDate(moment('2014-06-01'))).to.be.false;
        expect(a.validatePaymentDate(moment('2014-11-03'))).to.be.false;
    });
});