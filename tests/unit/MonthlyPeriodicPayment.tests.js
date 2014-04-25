var expect = require('chai').expect;

var MonthlyPeriodicPayment = require('../../lib/MonthlyPeriodicPayment');

describe('MonthlyPeriodicPayment', function() {
    it('should throw', function() {
        expect(function() {
            new MonthlyPeriodicPayment();
        }).to.throw(/not a number/);
    });

    it('should hold the values (/w end)', function() {
        var a = new MonthlyPeriodicPayment({
            value: 100,
            start: '2014-01-01',
            end: '2014-02-02',
            dates: [1, 2, 3]
        });

        expect(a.value()).to.equal(100);
        expect(a.start().isValid()).to.be.true;
        expect(a.end().isValid()).to.be.true;
        expect(a.dates()).to.deep.equal([1,2,3]);
    });
});