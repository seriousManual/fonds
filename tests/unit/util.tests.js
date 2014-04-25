var moment = require('moment');
var expect = require('chai').expect;

var ParameterHelper = require('../../lib/util/ParameterHelper');

describe('util', function() {
    describe('ParameterHelper', function() {
        describe('validDate', function() {
            it('should return a date', function() {
                expect(ParameterHelper.validDate('2010-01-01').isValid()).to.be.true;
            });

            it('should return a date', function() {
                expect(ParameterHelper.validDate(moment('2010-01-01')).isValid()).to.be.true;
            });

            it('should throw on undefined date', function() {
                expect(function() {
                    ParameterHelper.validDate();
                }).to.throw(/not allowed/);
            });

            it('should throw on null date', function() {
                expect(function() {
                    ParameterHelper.validDate(null);
                }).to.throw(/not allowed/);
            });

            it('should throw on invalid date', function() {
                expect(function() {
                    ParameterHelper.validDate('foobar');
                }).to.throw(/invalid date: foobar/);
            });
        });

        describe('geDate', function() {
            it('should throw', function() {
                expect(function() {
                    ParameterHelper.geDate();
                }).to.throw(/not allowed/);
            });

            it('should throw', function() {
                expect(function() {
                    ParameterHelper.geDate('2013-01-01', '2014-01-01');
                }).to.throw(/should be greater/);
            });

            it('should return', function() {
                expect(ParameterHelper.geDate('2014-01-01', '2013-01-01').format('YYYY-MM-DD')).to.deep.equal('2014-01-01');
            });
        });

        describe('notNull', function() {
            it('should return anything', function() {
                expect(ParameterHelper.notNull('foo')).to.equal('foo');
            });

            it('should throw', function() {
                expect(function() {
                    ParameterHelper.notNull(null);
                }).to.throw(/value not allowed/);
            });
        });

        describe('notUndefined', function() {
            it('should return anything (undefined test)', function() {
                expect(ParameterHelper.notUndefined('foo')).to.equal('foo');
            });

            it('should throw (undefined test)', function() {
                expect(function() {
                    ParameterHelper.notUndefined();
                }).to.throw(/not allowed/);
            });
        });

        describe('isSet', function() {
            it('should throw (isSet)', function() {
                expect(function() {
                    ParameterHelper.isSet();
                }).to.throw(/not allowed/);
            });

            it('should throw (isSet)', function() {
                expect(function() {
                    ParameterHelper.isSet(null);
                }).to.throw(/not allowed/);
            });

            it('should return anything (undefined test)', function() {
                expect(ParameterHelper.isSet('foo')).to.equal('foo');
            });
        });

        describe('isArray', function() {
            it('should throw (isArray)', function() {
                expect(function() {
                    ParameterHelper.isArray('foo');
                }).to.throw(/not an array: foo/);
            });

            it('should return anything (isArray)', function() {
                expect(ParameterHelper.isArray([])).to.deep.equal([]);
            });
        });

        describe('isNonEmptyArray', function() {
            it('should throw (isNonEmptyArray)', function() {
                expect(function() {
                    ParameterHelper.isNonEmptyArray('foo');
                }).to.throw(/not an array: foo/);
            });

            it('should throw (isNonEmptyArray)', function() {
                expect(function() {
                    ParameterHelper.isNonEmptyArray([]);
                }).to.throw(/empty array not allowed/);
            });

            it('should return anything (isNonEmptyAray)', function() {
                expect(ParameterHelper.isNonEmptyArray([1])).to.deep.equal([1]);
            });
        });

        describe('isInteger', function(){
            it('should throw (isInteger)', function() {
                expect(function() {
                    ParameterHelper.isInteger('foo');
                }).to.throw(/not a number: foo/);
            });

            it('should return anything (isInteer)', function() {
                expect(ParameterHelper.isInteger(1)).to.equal(1);
            });
        });

        describe('ge', function() {
            it('should throw (ge)', function() {
                expect(function() {
                    ParameterHelper.ge(1, 1000);
                }).to.throw(/should be greater\/equals 1000/);
            });

            it('should return anything (ge)', function() {
                expect(ParameterHelper.ge(1, 1)).to.equal(1)
            });

            it('should return anything (ge)', function() {
                expect(ParameterHelper.ge(1000, 1)).to.equal(1000);
            });
        });
    });
});