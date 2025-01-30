const express =require("express")

const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")

const UserModel = require("../models/usermodel")

const  userRoute = express.Router()

userRoute.post("/register",async(req,res)=>{

    const {  username,
        password,
        email,
        age,
        roles} = req.body
    try {
        bcrypt.hash(password,5,async function(err,hash){
        if(err){
            res.status(500).json({message:"Error occured during hashing of password"})
        }else{
            const user =  new UserModel({
                username,
                password:hash,
                email,
                age,
                roles,
        
               })
               await user.save()
            res.status(200).json({message:"Register with  hash password"})
        }

        })
       

    } catch (error) {
        res.status(500).json({message:"err in hash password"})
    }
})
userRoute.post("/login",async(req,res)=>{

const {email,password} = req.body

try {
    const user = await UserModel.findOne({email})
    if(!user){
        return res.status(400).json({message:"user not found"})
    }
    if(user){
        bcrypt.compare(password,user.password,function(err,result){
   

    if (result) {
        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY
            
        );

        // Respond with success and the token
        res.status(200).json({ message: "User logged in successfully", token, });
    } else {
        // Password is incorrect
        res.status(401).json({ message: "Invalid password" });
    }
})
    }
} catch (error) {
    res.status(501).json({message:`err in login ${error}`})
}

})
module.exports = userRoute