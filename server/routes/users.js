var express = require('express'),
    router = express.Router(),
    Partner = require('../models/partner-model.js'),
    User = require('../models/user-model.js');

var isAuthenticated = function(req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    // res.redirect('/');
    var err = req.flash('message')[0],
        info = req.flash('info')[0];
    res.send(message,info);
}

router.get('/user/address', isAuthenticated, function(req, res) {
	var userEmail = req.user.email;	
    User.getUserAddress(userEmail, function(err, userAddress) {
        if (!err && userAddress) {
            res.json(userAddress);            
            res.status(200);
            return;
        } else {
            res.json({
                " Error": err
            });
            res.status(201);
            return;
        }
    })
});

router.put('/user/update-profile', isAuthenticated, function(req, res) {
	var userObj = {};
		userObj.email = req.body.email;
		if (req.body.fullName)
			userObj.fullName = req.body.fullName;
		if (req.body.phone)
			userObj.phone = req.body.phone;
	User.updateProfile(userObj, function (err, user) {
		if (!err && user) {
			res.status(200);
			res.json(user);
			return;
		} else {
			res.json({
                " Error": err
            });
            res.status(201);
            return;
		}
	});
});

router.put('/user/update-address', isAuthenticated, function(req, res) {
	var userObj = {};
		userObj.email = req.user.email;
		userObj.addressLine1 = req.body.addressLine1;
		userObj.addressLine2 = req.body.addressLine2;
		userObj.City = req.body.City;
		userObj.State = req.body.State;
		userObj.ZipCode = req.body.ZipCode;
	User.updateAddress(userObj, function (err, user) {
		if (!err && user) {
			res.status(200);
			res.json(user);
			return;
		} else {
			res.json({
                " Error": err
            });
            res.status(201);
            return;
		}
	});
});

module.exports = router;