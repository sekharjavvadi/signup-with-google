const googlestrategy=require('passport-google-oauth20').Strategy
const mongoose=require('mongoose');
const session=require('express-session')
const User=require('../models/user')

module.exports = function (passport){
    passport.use(
        new googlestrategy(
            {
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:'/auth/google/callback'
    },
    async (accessToken,refreshToken,profile,done)=>
    {
        console.log(profile)
        const newUser = {
            googleid:profile.id,
            displayname:profile.displayName,
            firstname:profile.name.givenName,
            lastname:profile.name.familyName,
            image:profile.photos[0].value
        }
        try{
            let user= await User.findOne({googleid:profile.id})
            if(user){
                done(null,user)
            }
            else{
                user=await User.create(newUser)
                done(null,user)
            }

        }
        catch (err){
            console.error(err)

        }

    }
    ))
    passport.serializeUser((user,done)=>
    {
        done(null,user.id)
    })
    passport.deserializeUser((id,done)=>
    {
        User.findById(id,(err,user)=> done(err,user))
    })

}