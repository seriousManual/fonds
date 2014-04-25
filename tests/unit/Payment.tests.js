var expect = require('chai').expect;

var Payment = require('../../lib/Payment');

describe('Payment', function() {
    it('should throw', function() {
        expect(function() {
            new Payment();
        }).to.throw(/not a number/);
    });

    it('should hold the value', function() {
        expect(new Payment({value: 100}).value()).to.equal(100);
    });

    it('should throw', function() {
        var foo = new Payment({value: 100});

        expect(function() {
            foo.validatePayment();
        }).to.throw(/not implemented/);
    });
});