const mongoose =require("mongoose");
const LoginuserSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique:true,
        trim: true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
    }
},
{timestamps:true}

);

const Login =mongoose.model("LoginEntry",LoginuserSchema);

module.exports ={Login};