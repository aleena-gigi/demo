const express=require("express")
const app=express()
require('dotenv').config()
const AWS=require('aws-sdk')

AWS.config.update({
    region:process.env.AWS_DEFAULT_REGION,
    acessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
})
const port=process.env.port||3000
const dynamoclient=new AWS.DynamoDB.DocumentClient();

let user=async(id)=>{
    const params={
    TableName:"User",
    Key:{
        emailId:id
        }
    }
    let data= await dynamoclient.get(params).promise()       
    return data.Item
}

app.get("/register",async(req,res)=>{
    id=req.query.emailId
    pswd=req.query.Password
    if (await user(id)!==undefined)
    { 
        res.send("User already exists")
    }
    else
    {
        const params={
            TableName:"User",
            Item:{
                emailId:id,
                Password:pswd
            }
        }
        dynamoclient.put(params,(err)=>{
            if (err) console.log(err)
            else 
            {
                res.send("User Created")
            }

        })
    }
 })
 app.get("/login",async(req,res)=>{
    let id=req.query.emailId
    let pswd=req.query.Password
    let data=await user(id)
    if (data!==undefined){
        if (data.Password==pswd){
            res.send("Logged in ")
        }
        else res.send("Incorrect Password")
    }
    else res.send("User doesn't exists")
 })
 app.listen(4000)