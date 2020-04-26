const User = require('../models/user')
const jwt = require('jsonwebtoken')
const sendgridMail = require('@sendgrid/mail')
sendgridMail.setApiKey(process.env.SENDGRID_APIKEY)

// exports.signup = (req, res) =>{
//     const {name, email, password} = req.body;

//     User.findOne({email}).exec((err, user)=>{
//         if(user){
//            return res.status(400).json({
//                error: 'User already exists with this email address'
//            })
//         }
//     });

//     //create a new user
//     let newUser = new User({name, email, password});
//     newUser.save((err, success)=>{
//         if(err){
//             console.log('sign up error');
//             return res.status(400).json({
//                 error: err
//             })
//         } else {
//             res.json({
//                 message:'Sign Up successfull'
//             })
//         }
//     })

// }

exports.signup = (req, res) => {
    const {
        name,
        email,
        password
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
        email,
        password
    }, process.env.JWT_ACCOUNT_ACTIVATION, {
        expiresIn: '15m'
    })
    console.log(token)

    const emailSendData = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Activate your Band-Wagon account',
        html: `<h2>Please use the folowing link to activate your Band Wagon account</h2>
        <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
        <br>
        <h5>Become an official Band Wagoner!!</h5>
        <p>${process.env.CLIENT_URL}</p>
        `
    }

    //send email
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
const {token} = req.body;

if(token){
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err, decodedToken) {
        if(err) {
            console.log('Failed to verify JWT')
            return res.status(401).json({
                error:'Expired Link.  Please sign up again'
            })
        }
        const { name, email, password } = jwt.decode(token);

        const user = new User({ name, email, password });

        user.save((err, user) =>{
            if(err){
                return res.status(401).json({
                    error: 'Error saving user to DB, Please sign up again'
                })
            }
            return res.json({
                message:'Sign Up Successfull'
            })
        })
    })
}
}

exports.signin= (req, res) => {
    const {email, password} = req.body;
    User.findOne({email}).exec((err, user)=>{
        if(!user || err){
            return res.status(400).json({
                error: `User with that email does not exist : ${err}`
            })
        }
        if(!user.authenticate(password)){
             error: "Invalid password"
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn:'60m'});

        const {_id, name, email, role} = user;

        return res.status(201).json({
            token,
            user: {_id, name, email, role} 
        })

    })
}