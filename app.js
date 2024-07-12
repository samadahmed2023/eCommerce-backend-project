const express =require('express');
const router =require('./src/routes/api');
const app= new express();

const bodyParser = require('body-parser')
const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const mongoSanitize =require('express-mongo-sanitize');

const xss =require('xss-clean');
const hpp =require('hpp');
const cors =require('cors');
const cookieParser = require('cookie-parser');
const mongoose =require('mongoose');


// Database connection.
let URI="mongodb+srv://<username>:<password>@cluster0.pq7y8jt.mongodb.net/eCommerce";
let OPTION={user:'samad',pass:'samad1234',autoIndex:true}

// let URI="mongodb://localhost:27017/eCommerce"
// let OPTION={user:'',pass:"",autoIndex:true};

mongoose.connect(URI,OPTION).then((res)=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log(err)
})

app.use(bodyParser.json())
app.use(cookieParser());
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)

app.set('etag', false);

app.use("/api/v1",router)


// Undefined Route Implement
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Found"})
})


module.exports=app;