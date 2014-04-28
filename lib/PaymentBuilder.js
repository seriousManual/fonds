var MonthlyPayment = require('./payments/MonthlyPeriodicPayment');
var YearlyPayment = require('./payments/YearlyPeriodicPayment');
var OneTimePayment = require('./payments/OneTimePayment');

var payments = {};

payments[MonthlyPayment.KEY] = MonthlyPayment;
payments[YearlyPayment.KEY] = YearlyPayment;
payments[OneTimePayment.KEY] = OneTimePayment;

module.exports = {
    identifyPayment: function (paymentData) {
        if (payments[paymentData.type]) {
            return new payments[paymentData.type](paymentData);
        }

        throw new Error('could not identify payment of type: ' + paymentData.type);
    }
};