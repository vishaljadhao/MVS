var LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user-model'),
    partnerModel = require('../models/partner-model'),
    bCrypt = require('bcrypt-nodejs'),
    env = process.env.NODE_ENV || "development",
    config = require('../../config/config.json')[env],
    emailService = require('../services/email.js');


module.exports = function(passport) {

    passport.use('signup', new LocalStrategy({
            usernameField: 'email',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {

            findOrCreateUser = function() {
                // find a user in Mongo with provided email
                User.findOne({
                    'email': email
                }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err) {
                        console.log('Error in SignUp: ' + err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with email: ' + email);
                        return done(null, false, req.flash('message', 'User Already Exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.email = email;
                        newUser.password = createHash(password);
                        newUser.fullName = req.body.fullName;
                        newUser.phone = req.body.phone;

                        // save the user
                        newUser.store();
                        console.log('User Registration succesful');
                        emailService.sendNewRegistrationIntimation(config.newUserIntimationRecipients, email, req.body.fullName, req.body.phone);
                        return done(null, newUser);
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        }));

    // create a partner
    passport.use('partner-signup', new LocalStrategy({
            usernameField: 'email',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {

            findOrCreateUser = function() {
                // find a partner in Mongo with provided email
                partnerModel.findOne({
                    'email': email
                }, function(err, partner) {
                    // In case of any error, return using the done method
                    if (err) {
                        console.log('Error in SignUp: ' + err);
                        return done(err);
                    }
                    // already exists
                    if (partner) {
                        console.log('partner already exists with email: ' + email);
                        return done(null, false, req.flash('message', 'partner Already Exists'));
                    } else {
                        // if there is no partner with that email
                        // create the partner
                        var newPartner = new partnerModel();

                        // set the partner's local credentials
                        newPartner.email = email;
                        newPartner.password = createHash(password);
                        newPartner.fullName = req.body.fullName;
                        newPartner.phone = req.body.phone;
                        if (req.body.partnerLatLng) {
                            var coordinatesObj =JSON.parse(req.body.partnerLatLng);
                            newPartner.coordinates.Lat = coordinatesObj.lat;
                            newPartner.coordinates.Lng = coordinatesObj.lng;
                        }                        
                        newPartner.Area = req.body.locality;
                        newPartner.ServiceCenterName = req.body.centerName;
                        newPartner.BasicServicingFare = req.body.basicCharge;
                        newPartner.AvailableServices.bikeService = req.body.bikeservice;
                        newPartner.AvailableServices.carService = req.body.carService;
                        newPartner.AvailableServices.washing = req.body.washing;
                        newPartner.AvailableServices.detailing = req.body.detailing;
                        newPartner.AvailableServices.towing = req.body.towing;

                        // save the partner
                        newPartner.store();
                        console.log('partner Registration succesful');
                        emailService.sendNewRegistrationIntimation(config.newUserIntimationRecipients, email, req.body.fullName, req.body.phone);
                        return done(null, newPartner);
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        }));

    // Generates hash using bCrypt
    var createHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}