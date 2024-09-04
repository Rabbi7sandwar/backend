const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');
const Menu = require('../models/menu');
const mongoose = require('mongoose');

// Get all restaurants
router.get('/getAllResturant', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json({
            data: restaurants,
            statusCode: 200,
            status: true
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new restaurant
router.post('/addNewResturant', async (req, res) => {

    const restaurant = new Restaurant({
        resturantName: req.body.resturantName,
        ownerName: req.body.ownerName,
        email: req.body.email,
        website: req.body.website,
        cuisine: req.body.cuisine,
        contactNo: req.body.contactNo,
        operationHourStarts: req.body.operationHourStarts,
        operationHourEnds: req.body.operationHourEnds,
        address: req.body.address,
        isActive: req.body.isActive,
    });
    try {
        const newRestaurant = await restaurant.save();
        res.status(201).json({
            data: newRestaurant,
            statusCode: 201,
            status: true
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get  restaurants by id
router.get('/getResturantById/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (restaurant == null) {
            return res.status(404).json({ message: 'Cannot find restaurant' });
        }
        res.json({
            data: restaurant,
            statusCode: 200,
            status: true
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//update resturant by id
router.put('/updateResturantById/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid restaurant ID' });
    }
    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedRestaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json({
            data: updatedRestaurant,
            statusCode: 200,
            status: true
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



//add menu list
router.post('/addMenu', async (req, res) => {
    const menu = new Menu({
        resturantId: req.body.resturantId,
        itemName: req.body.itemName,
        price: req.body.price,
        category: req.body.category,
        isActive: req.body.isActive,
    });
    try {
        const newMenu = await menu.save();
        res.status(201).json({
            data: newMenu,
            statusCode: 201,
            status: true
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all menu items by restaurant ID
router.get('/getAllMenuByResId/:resId', async (req, res) => {
    try {
        const menu = await Menu.find({ resturantId: req.params.resId });
        if (menu.length === 0) {
            return res.status(404).json({ message: 'No menu items found for this restaurant' });
        }
        res.json({
            data: menu,
            statusCode: 200,
            status: true
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Update a menu item by ID
router.put('/updateMenuItemById/:id', async (req, res) => {
    try {
        const updatedMenuItem = await Menu.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json({
            data: updatedMenuItem,
            statusCode: 200,
            status: true
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
