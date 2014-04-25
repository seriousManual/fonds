var expect = require('chai').expect;

var OneTimePayment = require('../../lib/OneTimePayment');

describe('OneTimePayment', function() {
    it('should throw', function() {
        expect(function() {
            new OneTimePayment();
        }).to.throw(/not a number/);
    });

    it('should hold the values', function() {
        var a = new OneTimePayment({
            value: 100,
            date: '2014-01-01'
        });

        expect(a.value()).to.equal(100);
        expect(a.date().format('YYYY-MM-DD')).to.deep.equal('2014-01-01');
    });
});