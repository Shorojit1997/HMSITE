require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const config=require('config')
const setRoutes=require('./routes/routes')
const setMiddleware=require('./middleware/middleware')
const app = express();

// setup view engine
app.set('view engine', 'ejs');
app.set('views', 'views')



app.use(setMiddleware);
setRoutes(app)
app.use((req,res,next)=>{
  let error=new Error('404 not found');
  error.status=404;
  next(error);
} )
app.use((error,req,res,next)=>{
   if(error.status===404){
    return res.render('pages/error/404.ejs',{title:'404 not found',flashMessage:{}})
   }
   console.log(error)
   return res.render('pages/error/500.ejs',{title:'Internal Server Error',flashMessage:{}});
  
})




const PORT = process.env.PORT || 8000;
// mongobd connection 


mongoose.connect('mongodb://localhost/blogsite', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Database is running');
  app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
  })
});