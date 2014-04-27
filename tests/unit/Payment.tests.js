var expect = require('chai').expect;

var Payment = require('../../lib/payments/Payment');

describe('Payment', function() {
    it('should throw', function() {
        expect(function() {
            new Payment();
        }).to.throw(/not a number/);
    });

    it('should hold the value', function() {
        var a = new Payment({
            value: 100,
            comment: 'f00',
            fee: 0
        });

        expect(a.value()).to.equal(100);
        expect(a.fee()).to.equal(0);
        expect(a.comment()).to.equal('f00');
    });

    it('should throw', function() {
        var foo = new Payment({
            value: 100,
            fee: 0
        });

        expect(function() {
            foo.validatePaymentDate();
        }).to.throw(/not implemented/);
    });
});