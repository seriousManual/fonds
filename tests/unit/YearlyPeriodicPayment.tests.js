var expect = require('chai').expect;

var YearlyPeriodicPayment = require('../../lib/YearlyPeriodicPayment');

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
            start: '2014-01-01',
            end: '2014-02-01',
            dates: [[1,1]]
        });

        expect(a.value()).to.equal(100);
        expect(a.start().isValid()).to.be.true;
        expect(a.end().isValid()).to.be.true;
        expect(a.dates()).to.deep.equal([[1,1]]);
    });
});