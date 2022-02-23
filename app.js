const express = require('express');
const hbs = require('hbs');
const fetch = require('node-fetch');
const path = require('path');
var dotenv = require('dotenv');
const bodyParser = require('body-parser');
const Data = require('./model/data');

const app = express();


// load config
dotenv.config({path: './config/config.env'})

var connectDB = require("./config/db");
connectDB();


// Body parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Path
const views_path = path.join(__dirname,'views');
app.set("view engine", 'hbs');

app.use(express.static(path.join(__dirname, '/public')))



app.get('/', async(req,res)=>{

    try {

        // To delete all previous data
        await Data.deleteMany({});

        let objArray = [];

        await fetch("https://api.wazirx.com/api/v2/tickers")
            .then((apiData)=> apiData.json())
                .then(async(apiData)=>{

                    objArray = new Object(Object.values(apiData));
                })


        await Data.insertMany(objArray)
        .then(()=>{console.log("data inserted")})
        .catch((error)=>{console.log(error)})



        // To show Data in frontend
        const data = await Data.find().limit(10);
        res.render('index',{data})
    
    } 
    catch (error) {
        console.log(error);
    }
})







// For running server

let PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server is running at Port ${PORT}`);
})