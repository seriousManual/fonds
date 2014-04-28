var moment = require('moment');

module.exports = {
    validDate: function (date) {
        var tmpMoment = moment(this.isSet(date));

        if (!tmpMoment.isValid()) {
            throw new Error('invalid date: ' + date);
        }

        return tmpMoment;
    },

    notNull: function (value) {
        if (value === null) throw new Error('null value not allowed');

        return value;
    },

    notUndefined: function (value) {
        if (value === undefined) throw new Error('undefined value not allowed');

        return value;
    },

    isSet: function (value) {
        this.notNull(value)
        this.notUndefined(value);

        return value;
    },

    isArray: function (value) {
        if (!Array.isArray(value)) throw new Error('not an array: ' + value);

        return value;
    },

    isNonEmptyArray: function (value) {
        if (this.isArray(value).length === 0) throw new Error('empty array not allowed');

        return value;
    },

    isInteger: function (value) {
        if (typeof value !== 'number') throw new Error('not a number: ' + value);

        return value;
    },

    isFloat: function (value) {
        value = this.isInteger(value);
        if (value !== parseFloat(value)) throw new Error('not a float');

        return value;
    },

    ge: function (checkValue, threshold) {
        checkValue = this.isInteger(checkValue);

        if (checkValue < threshold) throw new Error(checkValue + ' should be greater/equals ' + threshold);

        return checkValue;
    },

    geDate: function (checkDate, threshold) {
        checkDate = this.validDate(checkDate);
        threshold = this.validDate(threshold);

        if (threshold.isAfter(checkDate, 'days')) {
            throw new Error(checkDate.format('YYYY-MM-DD') + ' should be greater/equals ' + threshold.format('YYYY-MM-DD'));
        }

        return checkDate;
    },

    dateAccessor: function (date) {
        date = this.validDate(date);

        return date.format('YYYYMMDD');
    }
};