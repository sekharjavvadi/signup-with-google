const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const connectdb=require('./config/db')

// load config
dotenv.config({path:'./config/config.env'});

// passport config
require('./config/passport')(passport)

connectdb();

const app=express();

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//logging
if(process.env.NODE_ENV==='development'){
   app.use(morgan('dev'))
}

// handlebars
app.engine('.hbs',exphbs({defaultLayout:'main',extname:'.hbs'}))
app.set('view engine','.hbs')

// sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )

// passport middle ware
app.use(passport.initialize())
app.use(passport.session())
//static folders
app.use(express.static(path.join(__dirname,'public')))

// routes
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))

const PORT=process.env.PORT || 3000

 app.listen(PORT,
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
// app.listen(PORT,'localhost')
