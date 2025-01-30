const mongoose = require("mongoose") 

const userSchema = mongoose.Schema({

    username:{
        type:'string',
        required:true
    },
    password:{
        type:'string',
        required:true
    },
    email:{
        type:'string',
        required:true
    },
    age:{
        type:Number,
        required:true
    },
},{
    versionKey:false
})

const UserModel = mongoose.model("User",userSchema)

module.exports = UserModel