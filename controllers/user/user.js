const query = require('../../lib/dao/query')

const getUserInfo = (req, res) => {
    // console.log(req.auth.data.phone)
    query('select * from T_ADMIN where phone = ? limit 1', [
        req.auth.data.phone,
    ])
        .then((ret) => {
            let info = ret[0]
            Promise.all([
                query(
                    'select count(*) as cnt from T_RELATION where admin_id1 = ? and relation = 0', // 关注数
                    [info.admin_id]
                ),
                query(
                    'select count(*) as cnt from T_RELATION where admin_id1 = ? and relation = 1', // 粉丝数
                    [info.admin_id]
                ),
            ])
                .then((ret) => {
                    // console.log(ret)
                    res.json({
                        code: 1,
                        data: {
                            account: info.account,
                            admin_id: info.admin_id,
                            pic: info.pic,
                            following: ret[0][0].cnt,
                            followers: ret[1][0].cnt,
                        },
                        msg: 'ok',
                    })
                })
                .catch((err) => {
                    res.json({
                        code: 500,
                        msg: '计算关注数与粉丝数发生错误, ' + err,
                    })
                })
        })
        .catch((err) => {
            res.json({
                code: 500,
                msg: '发生错误, ' + err,
            })
        })
}

const getRandUserInfo = (req, res) => {
    // console.log(req.query)
    if (req.query.count) {
        // console.log(req.query)
        query(`select * from T_ADMIN order by rand() limit ${req.query.count}`)
            .then((ret) => {
                let info = []
                ret.forEach((element) => {
                    info.push({
                        account: element.account,
                        sex: element.sex,
                        pic: element.pic,
                        home: element.home,
                        birthday: element.birthday,
                        create_time: element.create_time,
                        admin_id: element.admin_id,
                    })
                })
                res.json({
                    code: 1,
                    data: info,
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

const getUserInfoById = (req, res) => {
    // console.log(req.params.id)
    query('select * from T_ADMIN where admin_id = ? limit 1', [req.params.id])
        .then((ret) => {
            let info = ret[0]
            Promise.all([
                query(
                    'select count(*) as cnt from T_RELATION where admin_id1 = ? and relation = 0', // 关注数
                    [info.admin_id]
                ),
                query(
                    'select count(*) as cnt from T_RELATION where admin_id1 = ? and relation = 1', // 粉丝数
                    [info.admin_id]
                ),
            ])
                .then((ret) => {
                    // console.log(ret)
                    res.json({
                        code: 1,
                        data: {
                            account: info.account,
                            admin_id: info.admin_id,
                            pic: info.pic,
                            sex: info.sex,
                            create_time: info.create_time,
                            following: ret[0][0].cnt,
                            followers: ret[1][0].cnt,
                            birthday: info.birthday,
                            home: info.home,
                        },
                        msg: 'ok',
                    })
                })
                .catch((err) => {
                    res.json({
                        code: 500,
                        msg: '计算关注数与粉丝数发生错误, ' + err,
                    })
                })
        })
        .catch((err) => {
            res.json({
                code: 500,
                msg: '发生错误, ' + err,
            })
        })
}

const getUserInfoByPhone = (req, res) => {
    // console.log(req.params.id)
    if (req.params.phone) {
        query('select * from T_ADMIN where phone = ? limit 1', [
            req.params.phone,
        ])
            .then((value) => {
                // console.log(value)
                res.json({
                    code: 1,
                    data: value[0],
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

const follow = (req, res) => {
    console.log(req.auth.data.phone)
    const { follow_id } = req.body
    query('select * from T_ADMIN where phone = ? limit 1', [
        req.auth.data.phone,
    ])
        .then((value) => {
            console.log(value[0].admin_id)
            query(
                'insert into T_RELATION (admin_id1, admin_id2, relation) values (?, ?, ?)',
                [value[0].admin_id, follow_id, 0]
            )
                .then((value) => {
                    res.json({
                        code: 1,
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

const updateUserInfo = (req, res) => {
    const { pic, account, birthday, sex, emotion, job, home } = req.body
    const id = req.auth.data.id
    query('select * from T_ADMIN where admin_id = ?', [id])
        .then((value) => {
            let info = value[0]
            info.pic = pic == '' ? info.pic : pic
            info.account = account == '' ? info.account : account
            info.birthday = birthday == '' ? info.birthday : new Date(birthday)
            info.sex = sex == '' ? info.sex : sex
            info.emotion = emotion == '' ? info.emotion : emotion
            info.job = job == '' ? info.job : job
            info.home = home == '' ? info.home : home
            // res.json({
            //     code: 1,
            //     data: info,
            //     msg: 'ok',
            // })
            query(
                'update T_ADMIN set pic = ?, account = ?, birthday = ?, sex = ?, emotion = ?, job = ?, home = ? where admin_id = ?',
                [
                    info.pic,
                    info.account,
                    info.birthday,
                    info.sex,
                    info.emotion,
                    info.job,
                    info.home,
                    id,
                ]
            )
                .then((value) => {
                    res.json({
                        code: 1,
                        msg: 'ok',
                    })
                })
                .catch((err) => {
                    res.json({
                        code: 500,
                        msg: err,
                    })
                })
        })
        .catch((err) => {
            res.json({
                code: 500,
                msg: err,
            })
        })
}

module.exports = {
    getUserInfo,
    getRandUserInfo,
    getUserInfoById,
    getUserInfoByPhone,
    follow,
    updateUserInfo,
}
