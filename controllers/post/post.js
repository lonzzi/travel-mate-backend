const query = require('../../lib/dao/query')

const publishPost = (req, res) => {
    const id = req.auth.data.id

    const {
        start,
        end,
        money,
        registered,
        payment,
        start_time,
        end_time,
        title,
        content,
        pic,
    } = req.body
    console.log(JSON.stringify(pic))

    query(
        'insert into T_BACKPACKING (admin_id, start, end, money, registered, payment_method, start_time, end_time, title, content, pic) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            id,
            start,
            end,
            money,
            registered,
            payment,
            new Date(start_time),
            new Date(end_time),
            title,
            content,
            JSON.stringify(pic),
        ]
    )
        .then((value) => {
            // console.log(value)
            res.json({
                code: 1,
                data: {
                    id: value.insertId,
                },
                msg: 'ok',
            })
        })
        .catch((err) => {
            res.json({
                code: 500,
                msg: err,
            })
        })
}

const getPostById = (req, res) => {
    if (req.query.id) {
        query('select * from T_BACKPACKING where backpacking_id = ?', [
            req.query.id,
        ]).then((value) => {
            res.json({
                code: 1,
                data: value[0],
                msg: 'ok',
            })
        })
    } else {
        res.json({
            code: 500,
            msg: '未知错误',
        })
    }
}

const getRandPost = (req, res) => {
    // console.log(req.body)
    if (req.query.count) {
        query(
            `select * from T_BACKPACKING order by rand() limit ${req.query.count}`
        )
            .then((value) => {
                res.json({
                    code: 1,
                    data: value,
                    msg: 'ok',
                })
            })
            .catch((err) => {
                res.json({
                    code: 500,
                    msg: '发生错误, ' + err,
                })
            })
    } else {
        res.json({
            code: 500,
            msg: '发生未知错误',
        })
    }
}

const likePost = (req, res) => {
    const { backpacking_id } = req.body
}

module.exports = {
    publishPost,
    getPostById,
    getRandPost,
}
