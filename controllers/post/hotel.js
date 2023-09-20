const query = require('../../lib/dao/query')

const getRandHotel = (req, res) => {
    query('select * from T_HOTEL order by rand() limit 10')
        .then((value) => {
            res.json({
                code: 1,
                data: value,
                msg: 'ok',
            })
        })
        .catch((err) => {
            if (err) {
                res.json({
                    code: 500,
                    msg: err,
                })
            }
        })
}

const getHotelById = (req, res) => {
    if (req.query.id) {
        query('select * from T_HOTEL where hotel_id = ? limit 1', [
            req.query.id,
        ])
            .then((value) => {
                res.json({
                    code: 1,
                    data: value[0],
                    msg: 'ok',
                })
            })
            .catch((err) => {
                if (err) {
                    res.json({
                        code: 500,
                        msg: err,
                    })
                }
            })
    }
}

module.exports = {
    getHotelById,
    getRandHotel,
}
