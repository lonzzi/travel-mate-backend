const jwt = require('../../lib/jwt')
const query = require('../../lib/dao/query')

const register = (req, res) => {
    // console.log(req.body)
    const { account, pic, sex, phone, password, birthday } = req.body
    if (phone == '' || password == '') {
        res.json({
            code: 500,
            msg: '手机或密码不能为空',
        })
    } else {
        query(
            'insert into T_ADMIN (account, pic, sex, phone, password, birthday, create_time) values (?, ?, ?, ?, ?, ?, ?)',
            [
                account,
                pic,
                sex,
                phone,
                password,
                new Date(birthday[0], birthday[1] - 1, birthday[2]),
                new Date(),
            ]
        )
            .then((value) => {
                // console.log(value)
                const token = jwt.generateToken({
                    phone,
                    id: value.insertId,
                })
                res.json({
                    code: 1,
                    data: {
                        phone,
                        id: value.insertId,
                        token: 'Bearer ' + token,
                    },
                    msg: '注册成功',
                })
                return
            })
            .catch((err) => {
                res.json({
                    code: 500,
                    msg: '创建账号发生错误, ' + err,
                })
                return
            })
    }
}

const login = (req, res) => {
    const { phone, password } = req.body
    if (phone == '' || password == '') {
        res.json({
            code: 500,
            msg: '手机或密码不能为空',
        })
    } else {
        query('select * from T_ADMIN where phone = ? limit 1', [phone])
            .then((ret) => {
                if (ret.length == 0) {
                    res.json({
                        code: 500,
                        msg: '未找到用户',
                    })
                    return
                }
                // console.log(ret)
                if (ret[0].password != password) {
                    res.json({
                        code: 500,
                        msg: '账号或密码错误',
                    })
                    return
                }
                const token = jwt.generateToken({
                    phone,
                    id: ret[0].admin_id,
                })
                res.json({
                    code: 1,
                    data: {
                        id: ret[0].admin_id,
                        phone,
                        token: 'Bearer ' + token,
                    },
                    msg: '登录成功',
                })
            })
            .catch((err) => {
                if (err) {
                    res.json({
                        code: 500,
                        msg: '登录时发生错误, ' + err,
                    })
                    console.log(err)
                }
            })
    }
}

module.exports = {
    register,
    login,
}
