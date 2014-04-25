var moment = require('moment');

module.exports = {
    validDate: function(date) {
        var tmpMoment = moment(this.isSet(date));

        if(!tmpMoment.isValid()) {
            throw new Error('invalid date: ' + date);
        }

        return tmpMoment;
    },

    notNull: function(value) {
        if (value === null) throw new Error('null value not allowed');

        return value;
    },

    notUndefined: function(value) {
        if (value === undefined) throw new Error('undefined value not allowed');

        return value;
    },

    isSet: function(value) {
        this.notNull(value)
        this.notUndefined(value);

        return value;
    },

    isArray: function(value) {
        if(!Array.isArray(value)) throw new Error('not an array: ' + value);

        return value;
    },

    isNonEmptyArray: function(value) {
        if(this.isArray(value).length === 0) throw new Error('empty array not allowed');

        return value;
    }
};