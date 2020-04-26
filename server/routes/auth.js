const express = require('express');
const router =   express.Router();

//import controller
const {signup, activateAccount, signin} = require('../controllers/auth')

//import validators
const {userSignupValidator, signInValidator} = require('../validators/auth')
const {runValidation} = require('../validators')

router.post('/signup', userSignupValidator, runValidation, signup )

router.post('/activate-account', activateAccount )

router.post('/signin', signInValidator, runValidation, signin )

module.exports = router;