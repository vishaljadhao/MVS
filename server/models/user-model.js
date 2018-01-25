var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    id: ObjectId,
    fullName: String,
    email: String,
    phone: {
        type: Number,
        default: 0
    },
    gender: {
        "type": "string",
        "enum": ["Male", "Female"]
    },
    addressLine1: String,
    addressLine2: String,
    City: String,
    State: String,
    ZipCode: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    DOB: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

UserSchema.pre('save', function(next) {
    var now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

UserSchema.methods.store = function(err, otherProfile) {
    if (err != null || otherProfile == null) {
        this.save(function(err) {
            if (err) {
                console.log("Failed to save user");
            } else {
                console.log("Saved user");
            }
        })
    } else {
        otherProfile.fullName = this.fullName;
        otherProfile.email = this.email;
        otherProfile.phone = this.phone;
        otherProfile.password = this.password;
        otherProfile.save(function(err) {
            if (err) {
                console.log("Failed to save user");
            } else {
                console.log("Saved user");
            }
        });

    }
};

UserSchema.statics.updateProfile = function(userObj, callback) {
    var now = new Date();
    this.findOneAndUpdate({
        $and: [{
            email: userObj.email
        }, {
            $or: [{
                email: {
                    "$exists": false
                }
            }, {
                email: userObj.email
            }]
        }]
    }, {
        $set: {
            fullName: userObj.fullName,
            phone: userObj.phone,
            updatedAt: now
        }
    }, {
        upsert: true,
        safe: true,
        'new': true
    }, function(error, userObject) {
        callback(error, userObject);
    });
};

UserSchema.statics.updateAddress = function(userObj, callback) {
    var now = new Date();
    this.findOneAndUpdate({
        $and: [{
            email: userObj.email
        }, {
            $or: [{
                email: {
                    "$exists": false
                }
            }, {
                email: userObj.email
            }]
        }]
    }, {
        $set: {
            addressLine1: userObj.addressLine1,
            addressLine2: userObj.addressLine2,
            City: userObj.City,
            State: userObj.State,
            ZipCode: userObj.ZipCode,
            updatedAt: now
        }
    }, {
        upsert: true,
        safe: true,
        'new': true
    }, function(error, userObject) {
        callback(error, userObject);
    });
};

UserSchema.statics.getUserAddress = function(userEmail,callback) {
    this.find({email: userEmail}, {
        'addressLine1': 1,        
        'addressLine2': 1,
        'City': 1,
        'State': 1,
        'ZipCode': 1        
    }, function(err, userAddress) {
        callback(err, userAddress);
    }).lean();
};

var User = mongoose.model('User', UserSchema);

module.exports = User;