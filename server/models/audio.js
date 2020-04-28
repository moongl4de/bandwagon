const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 28
    },
    // email: {
    //     type: String,
    //     trim: true,
    //     required: true,
    //     lowercase: true,
    //     unique:true
    // },
    // {
    //     type: String,
    //     required: true,
    // },
    // {
    //     type: String,
    // },
    // role: {
    //     type: String,
    //     default: 'listener',
    // },
    //  {
    //     data: String,
    //     default: ''
    // }
},
{ timestamps: true},
);
