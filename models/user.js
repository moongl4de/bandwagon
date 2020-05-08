const mongoose = require('mongoose');
//used for hashing password 
const crypto = require('crypto');

//CREATE A user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 28
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique:true
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    //defines how strong the hashing password should be
    salt: {
        type: String,
    },
    role: {
        type: String,
        default: '',
    },
    resetPasswordLink: {
        data: String,
        default: ''
    }
},
{ timestamps: true},
);

//hash user input password to hashed password using virtual method and save in schema
userSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password)

    })
    .get(function () {
        return this._password
    })

//create userschema methods
//hasing algorithm used -> sha256, sha1......
userSchema.methods = {
    //checks if password user entered matches with the hashed password on DB
    authenticate: function(passwordText){
        return this.encryptPassword(passwordText) === this.hashedPassword 
    },

    encryptPassword: function (password) {
        if (!password) {
            return ''
        } else {
            try {
                return crypto.createHmac('sha1', this.salt)
                    .update(password)
                    .digest('hex');
            } catch (err) {
                return ''
            }
        }
    },

    makeSalt: function(){
        return Math.round(new Date().valueOf() * Math.random() + '')
    },
}

module.exports = mongoose.model('user', userSchema)
