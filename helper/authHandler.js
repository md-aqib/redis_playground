const jwt = require('jsonwebtoken');
const { userModel } = require('../modules/users/models/userModel');

const verifyToken = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if(!token) {
            return res.json({
                meta: { msg: "Unauthorized Access", status: false },
                error: "Token not provided"
            })
        } else {
            const decoded = await jwt.verify(token, "mysecretkey");
            if(!decoded) {
                return res.json({
                    meta: { msg: "Unauthorized Access", status: false },
                    error: "Token does not match"
                })
            };
            req.decoded = decoded;
            next()
        }
    } catch(e) {
        return res.json({
            meta: { msg: "Unauthorized Access", status: false },
            error: e
        })
    }
};

module.exports = { verifyToken }
