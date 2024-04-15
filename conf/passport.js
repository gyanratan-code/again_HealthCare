// import all the things we need  
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
				passReqToCallback: true
      },
      async (req,accessToken, refreshToken, profile,done ) => {
        //get the user data from google 
        // console.log(accessToken,refreshToken,profile);
        // console.log(profile);
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          email: profile.emails[0].value
        }
        console.log(newUser);
        try {
          //find the user in our database 
          let user = await User.findOne({ googleId: profile.id })
          // console.log(user);
          if (user!=null) {
            //If user present in our database.
            done(null, user)
            console.log("User alraedy present");
          } else {
            // if user is not preset in our database save user data to database.
            user = await User.create(newUser)
            done(null, user)
            console.log("User created");
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
			done(err, user);
		});
  })
}