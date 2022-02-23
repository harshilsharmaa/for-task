const mongoose = require('mongoose');
var dotenv = require('dotenv');
dotenv.config({path: './config/config.env'})

const connectDB = function(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{console.log("Database connected")}).catch((error)=>{console.log(error);})
}

module.exports = connectDB;




