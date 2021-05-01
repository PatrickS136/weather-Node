// Modules
require('dotenv').config();
const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const https=require("https");

// Setting up
const app=express();
const urlParser=bodyParser.urlencoded({extended:true});
const port=3000;
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/",(req,res)=>{
    res.render("index");
})

app.post("/",urlParser,(req,res)=>{
    const city=req.body.city;
    const temp=req.body.temp;
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.APIKEY}&units=${temp}`;
    https.get(url,(response)=>{
        if (response.statusCode===200){
            response.on("data",(data)=>{
                const parsedData=JSON.parse(data);
                const unit=(temp==="imperial")?"Fahrenheit":(temp==="metric")?"Celcius":("Kelvin");
                const selectedCity=parsedData.name;
                const description=parsedData.weather[0].description;
                const icon=parsedData.weather[0].icon;
                const degree=parsedData.main.temp;
                res.render("success",{city:selectedCity,description:description,icon:icon,temp:degree,units:unit});
            })
        }
        else{
            res.render("failure");
        }
    })
})

app.post("/failure",urlParser,(req,res)=>{
    res.redirect("/");
})

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})