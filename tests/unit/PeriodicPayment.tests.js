var expect = require('chai').expect;

var PeriodicPayment = require('../../lib/PeriodicPayment');

describe('PeriodicPayment', function() {
    it('should throw', function() {
        expect(function() {
            new Payment();
        }).to.throw();
    });

    it('should hold the values (/w end)', function() {
        var a = new PeriodicPayment({
            value: 100,
            start: '01.01.2014',
            end: '01.02.2014'
        });

        expect(a.value()).to.equal(100);
        expect(a.start().isValid()).to.be.true;
        expect(a.end().isValid()).to.be.true;
    });

    it('should hold the values (no end)', function() {
        var a = new PeriodicPayment({
            value: 100,
            start: '01.01.2014',
            end: null
        });

        expect(a.value()).to.equal(100);
        expect(a.start().isValid()).to.be.true;
        expect(a.end()).to.be.null;
    });
});