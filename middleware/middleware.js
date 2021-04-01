
const express = require('express');
const session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
const morgan = require('morgan')
const setLocals = require('./setLocals')
const { bindWithUserRequest } = require('./authMiddleware')
var flash = require('express-flash')
const config=require('config')


let store = new MongoDBStore({
    uri: 'mongodb://localhost/blogsite',
    collection: 'mySessions',
    expires: 1000 * 60 * 60 * 12
  });

const middleware = [
    morgan('dev'),
    express.json(),
    express.urlencoded({ extended: true }),
    express.static('public'),
    session({
      secret:config.get('secret'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 2 * 60 * 60 * 1000,
      },
      store: store
    }),
    bindWithUserRequest(),
    flash(),
    setLocals(),
  
  ]

  module.exports=middleware;