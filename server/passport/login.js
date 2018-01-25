var LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user-model'),
    partnerModel = require('../models/partner-model'),
    bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {

    passport.use('login', new LocalStrategy({
            usernameField: 'email',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            // check in mongo if a user with email exists or not
            User.findOne({
                    'email': email
                },
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // email does not exist, log the error and redirect back
                    if (!user) {
                        console.log('User Not Found with email ' + email);
                        return done(null, false, req.flash('message', 'User Not found.'));
                    }
                    // User exists but wrong password, log the error 
                    if (!isValidPassword(user, password)) {
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    return done(null, user);
                }
            );

        }));

    passport.use('partner-login', new LocalStrategy({
            usernameField: 'email',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            // check in mongo if a partner with email exists or not
            partnerModel.findOne({
                    'email': email
                },
                function(err, partner) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // email does not exist, log the error and redirect back
                    if (!partner) {
                        console.log('Partner Not Found with email ' + email);
                        return done(null, false, req.flash('message', 'Partner Not found.'));
                    }
                    // Partner exists but wrong password, log the error 
                    if (!isValidPassword(partner, password)) {
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                    }
                    // Partner and password both match, return partner from done method
                    // which will be treated like success
                    return done(null, partner);
                }
            );

        }));


    var isValidPassword = function(user, password) {
        return bCrypt.compareSync(password, user.password);
    }

}