const User = require('../model/User');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const ChangePassword = require('../model/ChangePassword');
const Calendar = require('../model/Calendar');

class AuthController {

    async register(req, res) {
        const id = uuid.v4();
        const key = uuid.v4();
        const { name, email, password } = req.body;
        if (email.indexOf('@') === -1) {
            return res.status(400).json({
                discription: "email is not correct"
            })
        }
        const user = await User.findOne({email});
        if (user) {
            return res.status(409).json({
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
            return res.status(400).json({
                discription: "error with send mail"
            })
        }
        await new User({id, key, name, email, password: hashPassword}).save().then(() => {
            res.cookie('key', key, {httpOnly: true})
            res.status(200).json({
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
            return res.status(404).json({
                discription: "user not found"
            })
        }
        const paswordMatch = await bcrypt.compare(password, user.password)
        if (paswordMatch) {
            res.cookie('key', user.key, {httpOnly: true})
            return res.status(200).json({ 
                user: {
                    name: user.name
                }
            })
        } else {
            return res.status(400).json({
                discription: "passwords does not match"
            })
        }
    }

    async changeName(req, res) {
        const key = req.cookies.key;

        const {name} = req.body;

        if (!key) {
            return res.status(401).json({
                discription: "user are not loggin"
            })
        }

        let user = await User.findOne({key});

        if (!user) {
            return res.status(404).json({
                discription: "user not found"
            })
        }

        await User.findOneAndUpdate({key}, {name})

        res.status(200);
    }

    async changePassword(req, res) {
        const key = req.cookies.key;
        const id = uuid.v4();
        const path = uuid.v4().split('-').join('');

        const {password} = req.body;

        if (!key) {
            return res.status(401).json({
                discription: "user are not loggin"
            })
        }

        let user = await User.findOne({key});

        if (!user) {
            return res.status(404).json({
                discription: "user not found"
            })
        }

        const salt =  await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const paswordMatch = await bcrypt.compare(password, user.password);

        if (paswordMatch) {
            return res.status(400).json({
                discription: "passwords match"
            })
        }

        const alreadyChangePassword = await ChangePassword.findOne({key});
        
        if (alreadyChangePassword) {
            await ChangePassword.findOneAndDelete({key});
        }
        

        await new ChangePassword({id, key, path, password: hashPassword}).save();
        

        try {
            let message = {
                from: `${process.env.EMAIL}`,
                to: user.email,
                subject: "Calendar",
                html: `
                <h3>Hello, ${user.name}.</h3>
                <br/>
                <p>If you haven't changed your password recently, follow <a href=${process.env.SERVERPATH}auth/checkchangepassword/${path}>this link</a>!</p>
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
            return res.status(400).json({
                discription: "error with send mail"
            })
        }

        res.status(200);

    }

    async checkChangePassword(req, res) {
        const id = req.params.id;
        const key = req.cookies.key;

        const changePassword = await ChangePassword.findOne({path: id})
        
        if (!changePassword) {
            return res.status(404).json({
                discription: "change password requst not found"
            })
        }

        if (changePassword.key !== key) {
            return res.status(400).json({
                discription: "user no same"
            })
        }

        await ChangePassword.findOneAndDelete({path: id})

        await User.findOneAndUpdate({key}, {password: changePassword.password}).then(response => {
            res.redirect(process.env.SITEPATH)
        }).catch(e => {
            return res.status(200).json({
                discription: "password don't update"
            })
        });
        
        
    }

    async logout(req, res) {
        res.clearCookie('key');
        return res.status(200);
    }

    async userInit(req, res) {
        const key = req.cookies.key;

        if (!key) {
            return res.status(401);
        }

        const user = await User.findOne({key})

        if (!user) {
            return res.status(404);
        }

        const calendar = await Calendar.findOne({key});

        if (!calendar) {
            return res.status(200).json({
                name: user.name
            })
        }

        return res.status(200).json({
            name: user.name,
            activity: calendar.activity
        })
    }
}

module.exports = new AuthController();