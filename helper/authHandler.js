const jwt = require('jsonwebtoken');
const { userModel } = require('../modules/users/models/userModel');

const verifyToken = async (req, res, next) => {
    const { token } = req.headers;
    if(!token) {
        return res.json({
            meta: { msg: "Unauthorized Access", status: false}
        })
    } else {
        const decoded = await jwt.verify(token, "mysecretkey");
        if(!decoded) {
            return res.json({
                meta: { msg: "Unauthorized Access", status: false}
            })
        };
        req.decoded = decoded;
        next()
    }
};

module.exports = { verifyToken }
