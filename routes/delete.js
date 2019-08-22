// import { models } from "mongoose";
const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const Orders = require('../models/Orders');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: false
}));

router.post('/delete', (req, res, next) => {
    let id = req.body.id
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
    Orders.findByIdAndDelete(id)
        .then((order) => {
            console.log("order has been deleted")
            Orders.find({}).sort({date: -1})
            .then(response => {
                res.json(response)
            })
        })
        .catch((err) => {
            console.log("error" + err)
        })
    }else{
        console.log("id does not match")
    }
})

module.exports = router;