var login = require('./login'),
    signup = require('./signup'),
    User = require('../models/user-model'),
    partnerModel = require('../models/partner-model');

module.exports = function(passport) {

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ', user)
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            if (err) done(err);
            var newUser = {};
            if (user) {
                newUser = buildUserData(user, "serviceAspirant")
                done(null, newUser);
            } else {
                partnerModel.findById(id, function(err, user) {
                    if (err) done(err);
                    if (user) {
                        newUser = buildUserData(user, "serviceProvider");
                        done(null, newUser);
                    }
                })
            }
        });
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);

};

function buildUserData(user, userRole) {
    var newUser = {};
    newUser.fullName = user.fullName;
    newUser.email = user.email;
    newUser.phoneNo = user.phone;
    newUser.createdAt = user.createdAt;
    newUser.role = userRole;
    if (userRole == "serviceAspirant") {
        newUser.addressLine1 = user.addressLine1;
        newUser.addressLine2 = user.addressLine2;
        newUser.City = user.City;
        newUser.State = user.State;
        newUser.ZipCode = user.ZipCode;
    } else {
        newUser.coordinates = user.coordinates;
        newUser.Area = user.Area;
        newUser.ServiceCenterName = user.ServiceCenterName;
        newUser.BasicServicingFare = user.BasicServicingFare;
        newUser.AvailableServices = user.AvailableServices;
    }
    return newUser;
}