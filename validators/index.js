const {validationResult}  = require('express-validator');

exports.runValidation = (req, res, next)=>{
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(422).json({
        error : errors.array()[0].msg
    })
}
//execute the callback function so that node js process continues to controller
next()
}