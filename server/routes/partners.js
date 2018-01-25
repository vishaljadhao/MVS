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
};

router.get('/', function(req, res) {
    Partner.getAllPartners(function(err, partners) {
        if (!err && partners) {
            res.json(partners);
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


router.get('/:_id', function(req, res) {
    var id = req.params._id;
    console.log(id);
    Partner.getPartnerById(id,function(err, partner) {
        if (!err && partner) {
            res.json(partner);
            res.status(200);
            return;
        } else {
            res.json({
                " Error": "Not Found"
            });
            res.status(201);
            return;
        }
    })
});

module.exports = router;