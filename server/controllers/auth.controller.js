const User = require('../model/User');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const ChangePassword = require('../model/ChangePassword');

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
        const hashPassword = await bcrypt.hash(password, salt);

        try {
            let message = {
                from: `${process.env.EMAIL}`,
                to: email,
                subject: "Calendar",
                html: `
                <h3>Hello, ${name}.</h3>
                <br/>
                <p>We are very glad to see you in our <a href=${process.env.SITEPATH}>calendar</a>!</p>
                `
            };

        let transporter = nodemailer.createTransport({
                host: "smtp.mail.ru",
                port: 465,
                secure: true,
                auth: {
                    user: `${process.env.EMAIL}`,
                    pass: `${process.env.EMAIL_PASSWORD}`
                }
            });

            await transporter.sendMail(message).then()

        } catch {
            return res.json({
                status: "error",
                discription: "error with send mail"
            })
        }
        await new User({id, key, name, email, password: hashPassword}).save().then(() => {
            res.cookie('key', key, {httpOnly: true})
            res.json({
                status: "ok",
                user: {
                    name
                }
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
            res.cookie('key', user.key, {httpOnly: true})
            res.json({  
                status: "ok",
                user: {
                    name: user.name
                }
            })
        } else {
            res.json({
                status: "error",
                discription: "passwords does not match"
            })
        }
    }

    async changeName(req, res) {
        const key = req.cookies.key;

        const {name} = req.body;

        if (!key) {
            return res.json({
                status: "error",
                discription: "user are not loggin"
            })
        }

        let user = await User.findOne({key});

        if (!user) {
            return res.json({
                status: "error",
                discription: "user not found"
            })
        }

        await User.findOneAndUpdate({key}, {name})

        res.json({
            status: "ok"
        })
    }

    async changePassword(req, res) {
        const key = req.cookies.key;
        const id = uuid.v4();
        const path = uuid.v4();

        const {password} = req.body;

        if (!key) {
            return res.json({
                status: "error",
                discription: "user are not loggin"
            })
        }

        let user = await User.findOne({key});

        if (!user) {
            return res.json({
                status: "error",
                discription: "user not found"
            })
        }

        const salt =  await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        await new ChangePassword({id, key, path, password: hashPassword}).save();
        

        try {
            let message = {
                from: `${process.env.EMAIL}`,
                to: user.email,
                subject: "Calendar",
                html: `
                <h3>Hello, ${user.name}.</h3>
                <br/>
                <p>If you haven't changed your password recently, follow <a href=${process.env.SITEPATH}auth/checkchangepassword/${path}>this link</a>!</p>
                `
            };

        let transporter = nodemailer.createTransport({
                host: "smtp.mail.ru",
                port: 465,
                secure: true,
                auth: {
                    user: `${process.env.EMAIL}`,
                    pass: `${process.env.EMAIL_PASSWORD}`
                }
            });

            await transporter.sendMail(message).then()

        } catch {
            return res.json({
                status: "error",
                discription: "error with send mail"
            })
        }

        res.json({
            status: "ok"
        })

    }

    async checkChangePassword(req, res) {
        const id = req.params.id;

        console.log(id)
    }
}

module.exports = new AuthController();