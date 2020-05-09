const {check} = require('express-validator');

exports.userSignupValidator =[
    check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),

    check('email')
    .isEmail()
    .withMessage('Email address not VALID'),

    check('password')
     .isLength({min : 5})
    .withMessage('Password must be atleast 5 char length'),

    check('role')
    .not()
    .isEmpty()
    .withMessage('Role is required'),
]

exports.signInValidator =[
    check('email')
    .isEmail()
    .withMessage('Email address not VALID'),

    check('password')
     .isLength({min : 5})
    .withMessage('Password must be atleast 5 char length'),
]