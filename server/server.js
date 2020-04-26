const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

//import routes
const authRoutes = require('./routes/auth');

//create a middleware
app.use(morgan('dev'))

app.use(bodyParser.json())

//allows all origin - we can specify certain origins only with more setting
// app.use(cors())
//WHERE react is running
if(process.env.NODE_ENV = 'development'){
    app.use(cors({origin: `http://locahost:3000`}))
}

app.use('/api', authRoutes)


const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`API RUNNNING ON ${port}`)
})


//connect to DB
const MONGODBURI = process.env.DATABASE;
mongoose.connect(MONGODBURI, {
    //added to avoid deprecated warning on terminal
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex:true,
    useUnifiedTopology:true,

}).then(()=>{
    console.log("DB Connected")
}).catch(err=>{
    console.log('DB Connection ERROR: ', err)
});