const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Orders = require('../models/Orders');

router.get('/admin', (req, res, next) => {
    Orders.find({})
    .then((orders) => {
        res.json(orders)
    })
    .catch((err) => {
        console.log(err)
    })

})

module.exports = router;