const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const Orders = require('../models/Orders');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: false
}));

router.post('/edit', (req, res, next) => {
let id = req.body.id
let splitRental,splitMeal;
if(req.body.rental.indexOf(',')> 0){
    splitRental = req.body.rental.split(",")
}else if(req.body.meal.length>0){
    splitRental = [req.body.rental]
}else{
   splitRental=[]
}

if(req.body.meal.indexOf(',')>0){
    splitMeal = req.body.meal.split(",")
} else if (req.body.meal.length>0){
    splitMeal = [req.body.meal]
}else{
    splitMeal=[]
}
    let editOrder = ({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        date: req.body.date,
        rental: splitRental,
        meal: splitMeal,
        amount: req.body.amount,
        notes: req.body.notes
        })
    
    Orders.findByIdAndUpdate(id, editOrder, {
        new: true
    })
        .then((order) => {
            console.log("Your order is updated")
            Orders.find({}).sort({date: -1})
            .then(response =>{
                res.json(response)
            })
        })
        .catch((err) => {
            console.log(err)
        })
})


module.exports = router;