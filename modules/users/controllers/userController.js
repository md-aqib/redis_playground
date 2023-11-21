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


module.exports = { userModel };