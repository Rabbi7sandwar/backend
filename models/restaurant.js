const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    resturantName: { type: String, required: true },
    ownerName: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String, required: true },
    contactNo: { type: String, required: true },
    operationHourStarts: { type: String, required: true },
    operationHourEnds: { type: String, required: true },
    cuisine: { type: String, required: true },
    address: { type: String, required: true },
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
