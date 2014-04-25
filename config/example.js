module.exports = {
    start: '01.01.2014',
    end: null,
    payments: [
        {
            type: 'monthly',
            start: '2014-01-01',
            dates:[1, 15],
            value: 100
        },
        {
            type: 'monthly',
            start: '2014-02-01',
            end: '2014-03-01',
            interval: 'month',
            dates: [1],
            value: 100
        },
        {
            type: 'yearly',
            start: '2014-03-01',
            dates: [[1,1], [1,6], [1,9]],
            value: 100
        },
        {
            type: 'oneTime',
            date: '2014-03-01',
            value: 500
        }
    ]
};