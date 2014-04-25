var expect = require('chai').expect;

var PeriodicPayment = require('../../lib/PeriodicPayment');

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
        expect(a.start().isValid()).to.be.true;
        expect(a.end().isValid()).to.be.true;
    });

    it('should hold the values (no end)', function() {
        var a = new PeriodicPayment({
            value: 100,
            start: '2014-01-01',
            end: null
        });

        expect(a.value()).to.equal(100);
        expect(a.start().isValid()).to.be.true;
        expect(a.end()).to.be.null;
    });
});