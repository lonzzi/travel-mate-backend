const query = require('../../lib/dao/query')

const createComment = (req, res) => {
    const admin_id = req.auth.data.id
    const { backpacking_id, content } = req.body
    query(
        'insert into T_BACKPACKING_COMMENT (admin_id, backpacking_id, content) values (?, ?, ?)',
        [admin_id, backpacking_id, content]
    )
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

const getCommentList = (req, res) => {
    if (req.query.id) {
        query('select * from T_BACKPACKING_COMMENT where backpacking_id = ?', [
            req.query.id,
        ])
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
                    msg: err,
                })
            })
    }
}

module.exports = {
    createComment,
    getCommentList,
}
