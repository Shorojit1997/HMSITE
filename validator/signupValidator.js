
const {body}=require('express-validator')
const userSchema=require('../models/User')


const signupValidator=[
  body('username')
   .isLength({min:2,max:15})
   .withMessage('Username must be between 2 to 15 character')
   .custom(async username=>{

     let user= await userSchema.findOne({username})
     if(user){
         return Promise.reject('Username is already  used')
     }
   })
   .trim(),
   body('email')
   .isEmail()
   .withMessage('Prease provide a Valid Email')
   .custom(async email=>{
       let user = await userSchema.findOne({email})
       if(user){
        return Promise.reject('Email is already  used')
       }
   })
   .normalizeEmail(),
   body('password')
   .isLength({min:5}).withMessage('Your password must be greater than 5 character'),
   body('confirmPassword')
   .isLength({min:5}).withMessage('Your password must be greater than 5 character')
   .custom((confirmPassword,{req})=>{
       if(confirmPassword!==req.body.password)
          throw new Error('Password does not match')
        return true;
   })

]

module.exports=signupValidator;