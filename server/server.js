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

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//allows all origin - we can specify certain origins only with more setting
// app.use(cors())
//WHERE react is running
// if(process.env.NODE_ENV = 'development'){
//     app.use(cors({origin: `http://locahost:3000`}))
// }

app.get('/api/upload', function(req, res){
    
})

app.use('/api', authRoutes)


const port = process.env.PORT || 8000;

const URI = process.env.MONGODB_URI || 'mongodb://localhost/bandwagon';
mongoose.connect(URI, {
    //added to avoid deprecated warning on terminal
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log("DB Connected")
}).catch(err => {
    console.log('DB Connection ERROR: ', err)
});

app.listen(port, () => {
    console.log(`API RUNNNING ON ${port}`)
})

// const API = 'k825MwjDf6De20ThzGUmubH7OtI86sCpJ2WSlSwsj0AN1utAphOH3GwlpgIetCgf'

//connect to DB
// const MONGODBURI = 'mongodb+srv://bandwagon:bandwagon@cluster0-dekyn.mongodb.net/test?retryWrites=true&w=majority'
// mongoose.connect(MONGODBURI, {
//     //added to avoid deprecated warning on terminal
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useCreateIndex:true,
//     useUnifiedTopology:true,

// }).then((db)=>{
//     console.log("DB Connected", db)
// }).catch(err=>{
//     console.log('DB Connection ERROR: ', err)
// });