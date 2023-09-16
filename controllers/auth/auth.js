const conn = require('../../db')
const jwt = require('../../lib/jwt')

const register = (req, res) => {
    const { phone, password } = req.body
    if (phone == '' || password == '') {
        res.json({
            code: 500,
            msg: '手机或密码不能为空',
        })
    } else {
        conn.query(
            'insert into T_ADMIN (account, phone, password, create_time) values (?, ?, ?, ?)',
            [phone, phone, password, new Date()],
            (err, ret) => {
                if (err) {
                    res.json({
                        code: 500,
                        msg: '创建账号发生错误, ' + err,
                    })
                    return
                }
                const token = jwt.generateToken({
                    phone,
                })
                res.json({
                    code: 1,
                    data: {
                        phone,
                        token: 'Bearer ' + token,
                    },
                    msg: '注册成功',
                })
            }
        )
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
        conn.query(
            'select * from T_ADMIN where phone = ? limit 1',
            [phone],
            (err, ret, fileds) => {
                if (err) {
                    res.json({
                        code: 500,
                        msg: '登录时发生错误, ' + err,
                    })
                    console.log(err)
                    return
                }
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
                })
                res.json({
                    code: 1,
                    data: {
                        phone,
                        token: 'Bearer ' + token,
                    },
                    msg: '登录成功',
                })
            }
        )
    }
}

module.exports = {
    register,
    login,
}
