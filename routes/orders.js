const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Orders = require('../models/Orders');

router.get('/orders', (req, res, next) => {
    Orders.find({}).sort({date: -1})
    .then((orders) => {
        res.status(200).json(orders);
    })
    .catch((err) => {
        console.log("back-end: " + err)
    })
})

module.exports = router;