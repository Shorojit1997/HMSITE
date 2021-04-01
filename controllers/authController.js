const userSchema = require('../models/User')
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const formatter = require('../utlits/validationErrorFormater')
const Flash = require('../utlits/Flash')


const signInGetController = (req, res, next) => {
    res.render('pages/auth/login',
        {
            title: "Login your account",
            error: {},
            value: {},
           flashMessage: Flash.getMessage(req)
        })

}
const signInPostController = async (req, res, next) => {
    let errors = validationResult(req).formatWith(formatter);

    if (!errors.isEmpty()) {
        req.flash('fail','Please try again ...')
        return res.render('pages/auth/login',
            {
                title: "Sorry you are not logged in ",
                error: errors.mapped(),
                flashMessage: Flash.getMessage(req)
            })
    }

    const { email, password } = req.body;
    try {

        let user = await userSchema.findOne({ email })
        if (!user) {
            req.flash('fail', 'Something happend error please try again.. ');
            return res.render('pages/auth/login',
                {
                    title: "Sorry you are not logged in ",
                    error: {},
                    flashMessage: Flash.getMessage(req)
                })
        }
        let match = await bcrypt.compare(password, user.password);
        if (!match) {
            req.flash('fail', 'Something happend error please try again.. ');
            return res.render('pages/auth/login',
                {
                    title: "Sorry you are not logged in ",
                    error: {},
                    flashMessage: Flash.getMessage(req)
                })
        }
        req.session.isLogedIn = true;
        req.session.user = user;
        req.session.save((err) => {
            if (err)
                return next(err);
            req.flash('success', 'Successfully logged in ');
            return res.redirect('/dashboard')
        })
        
    } catch (err) {
        next(err);
    }

}


const signUpGetController = (req, res, next) => {
    res.render('pages/auth/signup',
        {
            title: "Create new Account",
            error: {},
            value: {},
            flashMessage: Flash.getMessage(req)
        })

}
let errorOb = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const signUpPostController = async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;
    let errors = validationResult(req).formatWith(formatter);
    if (!errors.isEmpty()) {
        req.flash('fail','Please try again')
        return res.render('pages/auth/signup',
            {
                title: 'Create new account',
                error: errors.mapped(),
                value: { username, email, password },
                flashMessage: Flash.getMessage(req)
            })
    }
    try {
        let hash = await bcrypt.hash(password, 9);
        let user = new userSchema({
            username,
            email,
            password: hash
        })

        await user.save();
        req.flash('success','Account Created Successfully')
        res.render('pages/auth/login',
            {
                title: "Create new Account",
                error: { ...errorOb },
                value: {},
                flashMessage: Flash.getMessage(req)
            })

    }
    catch (err) {
        next(err);
    }
}
const LogoutGetController = (req, res, next) => {
    req.session.destroy((err) => {
        if (err)
            return next(err);
        return res.redirect('/auth/login')
    })
}


module.exports = {
    signInGetController,
    signInPostController,
    signUpGetController,
    signUpPostController,

    LogoutGetController
}