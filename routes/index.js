const express = require('express')
const router = express.Router()
const { ensureAuth,ensureGuest }=require('../middleware/auth')

// load config
const dotenv = require('dotenv')
dotenv.config({path:'./config/config.env'});

// login/landing page
//get /
router.get('/',ensureGuest,(req,res) =>
{
    res.render('login',{
        layouts:'login'
    })
})

// dashboard
// get/dashboard
router.get('/dashboard',ensureAuth,async (req,res)=>
{
    res.render('dashboard')
})

module.exports=router