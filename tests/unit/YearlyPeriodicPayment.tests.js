var expect = require('chai').expect;

var YearlyPeriodicPayment = require('../../lib/YearlyPeriodicPayment');

describe('YearlyPeriodicPayment', function() {
    it('should throw', function() {
        expect(function() {
            new YearlyPeriodicPayment();
        }).to.throw();
    });

    it('should hold the values (/w end)', function() {
        var a = new YearlyPeriodicPayment({
            value: 100,
            start: '01.01.2014',
            end: '01.02.2014',
            dates: [1, 2, 3]
        });

        expect(a.value()).to.equal(100);
        expect(a.start().isValid()).to.be.true;
        expect(a.end().isValid()).to.be.true;
        expect(a.dates()).to.deep.equal([1,2,3]);
    });
});