const User = require('../models/user')
const jwt = require('jsonwebtoken')
const sendgridMail = require('@sendgrid/mail')
const expressJwt = require('express-jwt');
require('dotenv').config();
sendgridMail.setApiKey(process.env.SENDGRID_APIKEY)


exports.signup = (req, res) => {
    const {
        name,
        role,
        email,
        password,
        paymentRequired
    } = req.body;
    User.findOne({
        email
    }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'User already exists with this email address'
            })
        }
    });

    const token = jwt.sign({
        name,
        role,
        email,
        password,
        paymentRequired
    }, process.env.JWT_ACCOUNT_ACTIVATION, {
        expiresIn: '15m'
    })

    const emailSendData =  role === 'admin' ?  {
        from: process.env.EMAIL_FROM,
        //send to one of the admins for activation
        to: 'me2say@gmail.com',
        subject: `Bandwagon Admin User account requested by - ${name}`,
        html: `<h1>Bandwagon Admin User account requested by - ${name}</h1>
         <h2>Please use the following link to APPROVE ADMIN ROLE</h2>
        <p>${process.env.CLIENT_URL}/activate/${token}</p>
        <br>
        <h5>Become an official Bandwagoner! (Is that a word? Who knows. It is now!) </h5>
        <p>${process.env.CLIENT_URL}</p>
        <br/>
        <p>Bandwagon Team</p>
        `
    }  : {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `Activate your Bandwagon ${role} account`,
        html: `<h1>Hey ${name}, welcome to Bandwagon</h1>
         <h2>Please use the folowing link to activate your Bandwagon ${role} account</h2>
        <p>${process.env.CLIENT_URL}/activate/${token}</p>
        <br>
        <h5>Become an official Bandwagoner! (Is that a word? Who knows. It is now!)</h5>
        <p>${process.env.CLIENT_URL}</p>
        <br/>
        <p>Bandwagon Team</p>
        `
    }

    const accountApprovedEmail = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `Hey ${name}, Your Bandwagon ${role} account has been approved`,
        html: `<h1>Hey ${name}, Your Bandwagon ${role} account has been approved</h1>
         <h2>Please use the following link to Access your Bandwagon ${role} account</h2>
        <p>${process.env.CLIENT_URL}</p>
        <br>
        <h5>You have become an official Bandwagon Boss!!</h5>
        <br/>
        <p>Bandwagon Team</p>
        `
    }

    //send email to direct to user for listener or artist roles. For Admin it will be sent to administrator for
    sendgridMail.send(emailSendData).then((sentSuccessfully) => {
        console.log("SENT EMAIL")
        return res.json({
            message: `Email has been sent to ${email} `
        })
    }).catch(err => {
        return res.json({
            message: `Email send failed : ${err}`
        })
    })

}

exports.activateAccount = (req, res) => {
    const {
        token
    } = req.body;

    if (token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function (err, decodedToken) {
            if (err) {
                console.log('Failed to verify JWT')
                return res.status(401).json({
                    error: 'Expired Link.  Please sign up again'
                })
            }
            const {
                name,
                role,
                email,
                password,
                paymentRequired

            } = jwt.decode(token);

            const user = new User({
                name,
                role,
                email,
                password,
                paymentRequired
            });

            user.save((err, user) => {
                if (err) {
                    return res.status(401).json({
                        error: 'Error saving user to DB, Please sign up again'
                    })
                }
                return res.json({
                    id: user._id,
                    message: 'Sign Up Successfull'
                })
            })
        })
    }
}

exports.signin = (req, res) => {
    const {
        email,
        password
    } = req.body;
    User.findOne({
        email
    }).exec((err, user) => {
        if (!user || err) {
            return res.status(400).json({
                error: `User with that email does not exist : ${err}`
            })
        }
        if (!user.authenticate(password)) {
            error: "Invalid password"
        }

        const token = jwt.sign({
            _id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: '60m'
        });

        const {
            _id,
            name,
            email,
            role,
            paymentRequired
        } = user;

        return res.status(201).json({
            token,
            user: {
                _id,
                name,
                email,
                role,
                paymentRequired
            }
        })

    })
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET // req.user
});