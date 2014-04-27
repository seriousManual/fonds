module.exports = {
    start: '01.01.2014',
    end: null,
    payments: [
        {
            comment: 'monthly, no end',
            type: 'monthly',
            start: '2014-01-01',
            dates:[1, 15],
            value: 100,
            fee: 0
        },
        {
            comment: 'monthly, with end',
            type: 'monthly',
            start: '2014-02-01',
            end: '2014-03-01',
            interval: 'month',
            dates: [1],
            value: 100,
            fee: 0
        },
        {
            comment: 'yearly',
            type: 'yearly',
            start: '2014-03-01',
            dates: [[1,1], [1,6], [1,9]],
            value: 100,
            fee: 0
        },
        {
            comment: 'oneTime',
            type: 'oneTime',
            date: '2014-03-01',
            value: 500,
            fee: 0
        }
    ]
};