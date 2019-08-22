const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Orders = require('../models/Orders');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: false
}));

router.post('/newOrder', (req, res, next) => {
    let splitRental;
    if(req.body.rental){
        splitRental = req.body.rental.split(",")
    }
   else{
       splitRental=[]
   }
    let splitMeal = req.body.rental.split(",")
    let newOrder = new Orders({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        date: req.body.date,
        rental: splitRental,
        meal: splitMeal,
        amount: req.body.amount,
        notes: req.body.notes
        })

    newOrder.save()
        .then((order) => {
            console.log("Your order is saved")
            Orders.find({}).sort({date: -1})
            .then(response => {
                res.json(response)
            })
        })
        .catch((err) => {
            res.send(err)
            console.log(err)
        })
})

module.exports = router;