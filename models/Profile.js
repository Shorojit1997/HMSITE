const {Schema,model} = require('mongoose');

const profileSchema= new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    name:{
        type:String,
        required:true,
        trim:true,
    },
    title:{
        type:String,
        trim:true,
        maxlength:100
    },
    bio:{
        type:String,
        trim:true,
        maxlength:500
    },
    profilePic:{
        type:String,
    },
    links:{
        website:String,
        facebook:String,
        twitter:String,
        github:String,
        instagram:String
    },
    post:[{
        type:Schema.Types.ObjectId,
        ref:'Post'
    }],
    bookmarks:[
        {
            type:Schema.Types.ObjectId,
            ref:'Post'
        }
    ]

},{
    timestamps:true
})
module.exports=model('Profile',profileSchema);