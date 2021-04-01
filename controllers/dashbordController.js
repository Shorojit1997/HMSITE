
const Flash= require('../utlits/Flash')
let Profile=require('../models/Profile')

const dashbordGetController=(req,res,next)=>{

    res.render('pages/dashboard/dashboard',
    {
        title:'Dashboard ',
        error:{},
        value:{},
        flashMessage:Flash.getMessage(req)
    
    
    })
}
const dashbordPostController=async(req,res,next)=>{
    
}

const createProfileGetController=async(req,res,next)=>{

  
    try{
        let profile=await Profile.findOne({user:req.user._id});
        if(profile){
            return res.redirect('/dashboard/edit-profile');
        }
        res.render('pages/dashboard/create-profile',
        {
            title:'Create Your Profile',
            flashMessage:Flash.getMessage(req),
        })

    }catch(err){

    }
}
const createProfilePostController=(req,res,next)=>{
    
}

const editProfileGetController=(req,res,next)=>{
    
}
const editProfilePostController=(req,res,next)=>{
    
}

module.exports={
    dashbordGetController,
    dashbordPostController,
    createProfileGetController,
    createProfilePostController,
    editProfileGetController,
    editProfilePostController
}