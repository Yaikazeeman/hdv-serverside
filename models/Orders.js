const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new Schema({
    name: String,
    phoneNumber: String,
    date: Date,
    rental: [{ type: String }],
    meal: [{ type: String }],
    amount: Number,
    notes: String
});

const Orders = mongoose.model('orders', orderSchema, "orders")

module.exports = Orders;