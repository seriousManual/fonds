module.exports = {
    payments: [
        {
            type: 'periodic',
            start: '01.01.2014',
            interval: 'month',
            dates:[1, 15],
            value: 100
        },
        {
            type: 'periodic',
            start: '01.02.2014',
            end: '01.03.2014',
            interval: 'month',
            dates: [1],
            value: 100
        },
        {
            type: 'oneTime',
            date: '01.03.2014',
            value: 500
        }
    ]
};