const express=require("app.js")
const app=express()
app.get("/",(req,res)=>{
    res.send("This is an express application")
}).listen(3002)