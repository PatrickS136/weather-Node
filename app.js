// Modules
const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");

// Setting up
const app=express();
const urlParser=bodyParser.urlencoded({extended:true});
const port=3000;
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/",(req,res)=>{
    res.render("index");
})

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})