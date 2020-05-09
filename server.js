const express = require('express');
const app = express();
const routes = require("./routes");
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
//import routes

//create a middleware
app.use(morgan('dev'))

// Define middleware here
// and ability to use req.body (parse application/json, basically parse incoming Request Object as a JSON Object )
app.use(bodyParser.json())
// combines the line above with line 7, then you can parse incoming Request Object if object, with nested objects, or generally any type.
app.use(express.urlencoded({ extended: true }));

// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

//allows all origin - we can specify certain origins only with more setting
// app.use(cors())
//WHERE react is running
// if(process.env.NODE_ENV = 'development'){
//     app.use(cors({origin: `http://locahost:3000`}))
// }

// app.get('/api/upload', function(req, res){
    
// })

const port = process.env.PORT || 8000;

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
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

// Start the API server
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