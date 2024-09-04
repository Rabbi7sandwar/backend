const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    resturantId: { type: String, required: true },
    itemName: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true
});
module.exports = mongoose.model('Menu', MenuSchema);
