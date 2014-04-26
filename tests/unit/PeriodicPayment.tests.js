var expect = require('chai').expect;
var moment = require('moment');

var testUtil = require('../util');
var PeriodicPayment = require('../../lib/payments/PeriodicPayment');

describe('PeriodicPayment', function() {
    it('should throw', function() {
        expect(function() {
            new PeriodicPayment();
        }).to.throw(/not a number/);
    });

    it('should throw when end is smaller than start', function() {
        expect(function() {
            new PeriodicPayment({
                value: 100,
                start: '01-01-2013',
                end: '01-01-2011'
            });
        }).to.throw(/should be greater/);
    });

    it('should hold the values (/w end)', function() {
        var a = new PeriodicPayment({
            value: 100,
            start: '2014-01-01',
            end: '2014-02-01'
        });

        expect(a.value()).to.equal(100);
        testUtil.dateCheck(a.start(), '2014-01-01');
        testUtil.dateCheck(a.end(), '2014-02-01');

        expect(a.validateDuration(moment('2014-01-01'))).to.be.true;
        expect(a.validateDuration(moment('2014-01-10'))).to.be.true;
        expect(a.validateDuration(moment('2015-01-01'))).to.be.false;
    });

    it('should hold the values (no end)', function() {
        var a = new PeriodicPayment({
            value: 100,
            start: '2014-01-01',
            end: null
        });

        expect(a.value()).to.equal(100);
        testUtil.dateCheck(a.start(), '2014-01-01');
        expect(a.end()).to.be.null;

        expect(a.validateDuration(moment('2012-01-01'))).to.be.false;
        expect(a.validateDuration(moment('2014-01-01'))).to.be.true;
        expect(a.validateDuration(moment('2014-01-10'))).to.be.true;
        expect(a.validateDuration(moment('2015-01-01'))).to.be.true;

    });
});