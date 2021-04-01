const route = require('express').Router();
const upload=require('../middleware/uploadMiddleware')


route.get('/play', (req, res, next) => {

    res.render('playground/play.ejs', { title: 'This is playground', flashMessage: {} })
})
route.post('/play',upload.single('my-file'),
    (req, res, next) => {
        console.log(req.file)

      return  res.redirect('/playground/play',400, { title: 'This is playground', flashMessage: {} })
    })


module.exports = route