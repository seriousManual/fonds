var MonthlyPayment = require('./payments/MonthlyPeriodicPayment');
var YearlyPayment = require('./payments/YearlyPeriodicPayment');
var OneTimePayment = require('./payments/OneTimePayment');

var payments = {
    'monthly': MonthlyPayment,
    'yearly': YearlyPayment,
    'oneTime': OneTimePayment
};

module.exports = {
    identifyPayment: function(paymentData) {
        if (payments[paymentData.type]) {
            return new payments[paymentData.type](paymentData);
        }

        throw new Error('could not identify payment of type: ' + paymentData.type);
    }
};