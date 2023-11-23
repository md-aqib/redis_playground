const jwt = require('jsonwebtoken');
const { userModel } = require('../modules/users/models/userModel');

const verifyToken = async (req, res, next) => {
    if(!req.headers.token) {
        return res.json({
            meta: { msg: "Unauthorized Access", status: false}
        })
    } else {
        const findUser = await jwt.verify();
    }
};
