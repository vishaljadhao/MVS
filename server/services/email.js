'use strict';
var env = process.env.NODE_ENV || "development",
    config = require(__dirname + '/../../config/config.json')[env],
    mailer = require('express-mailer'),
    app = null;

var self = module.exports = {
    init: function init(app) {
        mailer.extend(app, {
            from: config.mailer.from,
            host: config.mailer.host,
            secureConnection: config.mailer.secureConnection,
            port: config.mailer.port,
            transportMethod: config.mailer.transportMethod,
            auth: {
                user: config.mailer.authentication.username,
                pass: config.mailer.authentication.password
            }
        });
        this.app = app;
    },
    sendNewRegistrationIntimation: function(recipientsEmails, email, fullName, phone) {
        var emailData = {
            email: email,
            fullName: fullName,
            phone: phone,
            clientHost: config.clientHost,
        };
        this.app.mailer.send('mailer/new-user-intimation', {
            to: recipientsEmails,
            subject: 'New User ' + fullName + ' registered',
            emailData: emailData
        }, function(err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('New user registration email was sent to the admins!');
        });
    },
    resetPasswordLink: function(userEmail, fullName, resetToken) {
        var emailData = {
            userEmail: userEmail,
            fullName: fullName,
            resetToken: resetToken,
            clientHost: config.clientHost,
        };
        this.app.mailer.send('mailer/reset-password', {
            to: userEmail,
            subject: 'Reset your MVS password',
            emailData: emailData
        }, function(err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Reset password link email was sent to ' + userEmail);
        });
    },
    passwordChanged: function(userEmail, fullName) {
        var emailData = {
            userEmail: userEmail,
            fullName: fullName,
            clientHost: config.clientHost,
        };
        this.app.mailer.send('mailer/password-change-success', {
            to: userEmail,
            subject: 'Your MVS password changed',
            emailData: emailData
        }, function(err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Password change success, email was sent to ' + userEmail);
        });
    }
};