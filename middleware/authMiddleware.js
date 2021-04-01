const userSchema=require('../models/User')

const bindWithUserRequest=()=>{
    return async(req,res,next)=>{
        if(!req.session.isLogedIn){
            return next();
        }
        try{
            let user=await userSchema.findById(req.session.user._id);
            req.user=user;
            next()

        }
        catch(e){
           return next(e)
        }
    }
}


const isAuthenticated=(req,res,next)=>{
    if(!req.session.isLogedIn){
        return res.redirect('/auth/login')
    }
    next();
}
const isLogin=(req,res,next)=>{
   if(req.session.isLogedIn)
   {
       return res.redirect('/dashboard');
   }
   next();
}


module.exports={bindWithUserRequest,isAuthenticated,isLogin};