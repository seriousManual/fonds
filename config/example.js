module.exports = {
    start: '2014-01-01',
    end: null,
    payments: [
        {
            comment: 'monthly, no end',
            type: 'monthly',
            start: '2014-01-01',
            dates: [1, 15],
            value: 50,
            fee: 0.01
        },
        {
            comment: 'monthly, with end',
            type: 'monthly',
            start: '2014-02-01',
            end: '2014-03-01',
            interval: 'month',
            dates: [1],
            value: 100,
            fee: 0.05
        },
        {
            comment: 'yearly',
            type: 'yearly',
            start: '2014-03-01',
            dates: [
                [1, 1],
                [1, 6],
                [1, 9]
            ],
            value: 300,
            fee: 0.05
        },
        {
            comment: 'oneTime',
            type: 'oneTime',
            date: '2014-03-01',
            value: 1000,
            fee: 0.05
        }
    ]
};