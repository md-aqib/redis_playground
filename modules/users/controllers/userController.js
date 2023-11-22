const { userModel } = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const register = async (req, res) => {
    try {
        const {
            name,
            password,
            email,
            mobile
        } = req.body;
        if(!name || !passowrd || !email || !mobile) {
            return res.json({
                meta: { msg: "Missing Parameter", status: false }
            })
        };
        let salt = await bcrypt.genSalt(saltRounds)
        let hash = await bcrypt.hash(password, salt);
        const saveObj = {
            name,
            password: hash,
            email,
            mobile
        };
        const saveData = await new userModel(saveObj).save();
        return res.json({
            meta: { msg: "Data saved successfully", status: true },
            data: saveData
        });
    } catch(e) {
        return res.json({
            meta: { msg: e.message, status: false }
        })
    }
}

const login = async (req, res) =>  { 
    try {
        const { email, passowrd } = req.body;
        if(!email || !passowrd) {
            return res.json({
                meta: { msg: "Missing Parameter", status: false }
            })
        };
        const findUser = await userModel.findOne({ email });
        if(!findUser) {
            return res.json({
                meta: { msg: "Invalid email", status: false }
            })
        };
        let matchPass = bcrypt.compare(passowrd, hash);
        if(!matchPass) {
            return res.json({
                meta: { msg: "Invalid password", status: false }
            })
        };
        let token = jwt.sign(
            {
                userId: findUser.userId,
                email
            },
            'secret',
            { expiresIn: '1h' }
        );
        return res.json({
            meta: { msg: "logIn Successfully", status: true },
            token
        })
    } catch(e) {
        return res.json({
            meta: { msg: e.message, status: false }
        })
    }
}


module.exports = {
    register,
    login
};