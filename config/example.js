module.exports = {
    start: '01.01.2014',
    end: null,
    payments: [
        {
            type: 'monthly',
            start: '01.01.2014',
            dates:[1, 15],
            value: 100
        },
        {
            type: 'monthly',
            start: '01.02.2014',
            end: '01.03.2014',
            interval: 'month',
            dates: [1],
            value: 100
        },
        {
            type: 'yearly',
            start: '01.03.2014',
            dates: ['01.01', '01.06', '01.09'],
            value: 100
        },
        {
            type: 'oneTime',
            date: '01.03.2014',
            value: 500
        }
    ]
};