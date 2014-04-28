var expect = require('chai').expect;

module.exports = {
    dateCheck: function (actual, expeted) {
        expect(actual.format('YYYY-MM-DD')).to.equal(expeted);
    }
};