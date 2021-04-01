let Flash = require('../utlits/Flash')

module.exports=()=>{
    return (req,res,next)=>{
        res.locals.user=req.user;
        res.locals.isLogedIn=req.session.isLogedIn;
     //   res.locals.flashMessage=Flash.getMessage(req);
        next();
    }
}