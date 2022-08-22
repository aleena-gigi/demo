const express=require("app.js")
const app=express()
const port=process.env.port||3000
app.get("/",(req,res)=>{
    res.send("This is an express application")
}).listen(port)