var expect = require('chai').expect;

var ParameterHelper = require('../../lib/util/ParameterHelper');

describe('util', function() {
    describe('ParameterHelper', function() {
        it('should return a date', function() {
            expect(ParameterHelper.validDate('01.01.2010').isValid()).to.be.true;
        });

        it('should throw on undefined date', function() {
            expect(function() {
                ParameterHelper.validDate();
            }).to.throw();
        });

        it('should throw on null date', function() {
            expect(function() {
                ParameterHelper.validDate(null);
            }).to.throw();
        });

        it('should throw on invalid date', function() {
            expect(function() {
                ParameterHelper.validDate('foobar');
            }).to.throw();
        });

        it('should return anything', function() {
            expect(ParameterHelper.notNull('foo')).to.equal('foo');
        });

        it('should throw', function() {
            expect(function() {
                ParameterHelper.notNull(null).to.throw();
            });
        });

        it('should return anything (undefined test)', function() {
            expect(ParameterHelper.notUndefined('foo')).to.equal('foo');
        });

        it('should throw (undefined test)', function() {
            expect(function() {
                ParameterHelper.notUndefined();
            }).to.throw();
        });

        it('should throw (isSet)', function() {
            expect(function() {
                ParameterHelper.isSet();
            }).to.throw();
        });

        it('should throw (isSet)', function() {
            expect(function() {
                ParameterHelper.isSet(null);
            }).to.throw();
        });

        it('should return anything (undefined test)', function() {
            expect(ParameterHelper.isSet('foo')).to.equal('foo');
        });

        it('should throw (isArray)', function() {
            expect(function() {
                ParameterHelper.isArray('foo');
            }).to.throw();
        });

        it('should return anything (isArray)', function() {
            expect(ParameterHelper.isArray([])).to.deep.equal([]);
        });

        it('should throw (isNonEmptyArray)', function() {
            expect(function() {
                ParameterHelper.isNonEmptyArray('foo');
            }).to.throw();
        });

        it('should throw (isNonEmptyArray)', function() {
            expect(function() {
                ParameterHelper.isNonEmptyArray([]);
            }).to.throw();
        });

        it('should return anything (isNonEmptyAray)', function() {
            expect(ParameterHelper.isNonEmptyArray([1])).to.deep.equal([1]);
        });
    });
});