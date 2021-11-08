const User = require('../model/User');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

class AuthController {

    async register(req, res) {
        const id = uuid.v4();
        const key = uuid.v4();
        const { name, email, password } = req.body;
        if (email.indexOf('@') === -1) {
            return res.json({
                status: "error",
                discription: "email is not correct"
            })
        }
        const user = await User.findOne({email});
        if (user) {
            return res.json({
                status: "error",
                discription: "user already register"
            })
        }
        const salt =  await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)
        await new User({id, key, name, email, password: hashPassword}).save().then(() => {
            res.json({
                status: "ok"
            })
        });
    }

    async login(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.json({
                status: "error",
                discription: "user not found"
            })
        }
        const paswordMatch = await bcrypt.compare(password, user.password)
        if (paswordMatch) {
            res.json({  
                status: "ok"
            })
        } else {
            res.json({
                status: "error",
                discription: "passwords does not match"
            })
        }
    }
}

module.exports = new AuthController();