const jwtAuth = (err, req, res, next) => {
    if (err) {
        if (err.name == 'UnauthorizedError') {
            res.json({
                code: 401,
                msg: 'invalid token',
            })
            return
        }
        res.json({
            code: 400,
            msg: err,
        })
        return
    }
    next()
}
