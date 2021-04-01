const mongoose = require('mongoose');
const {Schema,model}=mongoose;
const userSchema= new Schema({
    username:{
        type:String,
        trim:true,
        maxlength:15,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    profile:{
        type:Schema.Types.ObjectId,
        ref:'Profile'
    },
    profilepics:{
        type:String,
    }

},{
    timestamps:true
})
module.exports=model('User',userSchema);