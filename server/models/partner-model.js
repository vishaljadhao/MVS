var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    User = require("../models/user-model.js");

var PartnerSchema = new Schema({
    id: ObjectId,
    fullName: String,
    email: String,
    phone: {
        type: Number,
        default: 0
    },
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    coordinates: {
        Lat: String,
        Lng: String
    },
    Area: String,
    ServiceCenterName: String,
    BasicServicingFare: {
        type: Number,
        default: 0
    },
    Ratings: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number,
            default: 0
        }
    }],
    TotalRating: {
        type: Number,
        default: 0
    },
    TotalUserRated: {
        type: Number,
        default: 0
    },
    Reviews: [{
        comment: String,
        reviewedBy: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserProfile'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    AvailableServices: {
        bikeService: String,
        carService: String,
        washing: String,
        detailing: String,
        towing: String
    },
    ShopacLicenseNumber: String,
    DOB: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

PartnerSchema.pre('save', function(next) {
    var now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

PartnerSchema.methods.store = function(err, otherProfile) {
    if (err != null || otherProfile == null) {
        this.save(function(err) {
            if (err) {
                console.log(err, "Failed to save partner");
            } else {
                console.log("Saved partner");
            }
        });
    } else {
        console.log(err, "Failed to save partner");
    }
};

PartnerSchema.statics.getAllPartners = function(callback) {
    this.find({}, {
        'fullName': 1,
        'phone': 1,
        'email': 1,
        'coordinates': 1,
        'Area': 1,
        'ServiceCenterName': 1,
        'BasicServicingFare': 1,
        'AvailableServices': 1,
        'Ratings': 1,
        'Reviews': 1
    }, function(err, partners) {
        callback(err, partners);
    }).lean();
};


PartnerSchema.statics.getPartnerById = function(id,callback) { 
    this.findById(id, {'password':0}, callback);
};

var Partner = mongoose.model('Partner', PartnerSchema);
module.exports = Partner;