//const passport = require("passport")

// load config
const dotenv = require('dotenv')
dotenv.config({path:'./config/config.env'});

module.exports ={
    ensureAuth: function (req,res,next){
        if(req.isAuthenticated()){
            console.log('authenticatedd')
            return next()
        }
        else{
            console.log('unauthenicated')
           // res.redirect('/')
           res.redirect(process.env.mainpage);
           
        }
    },
    ensureGuest:function(req,res,next){
        if(!req.isAuthenticated()){
            return next()
            
        }
        else
        {
            console.log('authenticated')
            //res.redirect('/dashboard')
            res.redirect(process.env.redirectpage)
            console.log('authenticated')
        }
    },
}