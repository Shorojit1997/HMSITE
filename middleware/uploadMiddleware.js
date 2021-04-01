const multer =require('multer');
const path=require('path');


const stroage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/uploads')
    },
    filename:(req,file,callback)=>{
        callback(null,file.fieldname+'-'+Date.now()+'-'+file.originalname)
    }
})

const upload=multer({
   storage:stroage,
   limits:{
       fileSize: 1024*1024*5,
   },
   fileFilter:(req,file,callback)=>{
       const types=/jpeg|jpg|png|gif/;
      
       const extName=types.test(path.extname(file.originalname).toLocaleLowerCase());
       const mimeType=types.test(file.mimetype)
       if(extName&&mimeType)
       {
           callback(null,true);
       }
       else{
           callback(new Error('Only support image file'))
       }
   }

})

module.exports=upload;