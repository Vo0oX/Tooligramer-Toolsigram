const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userScheme = new Schema({
    id: Number,
    balance: Number,
    add_funds: Number,
    invoice_payload: String,
    login: String,
    comments: [String],
    link: String,
    post_old: Number,
    post_new: Number,
    amount: Number,
    service_id: Number,
    task: String,
    request_type: String,
    text: String,
    example_text: String,
    price: Number,
    min: Number,
    max: Number,
    sum: Number,
    userOrder: [Object],
    userOrder_t: [Object],
    addFunds_t: [Object],
    step: String,
    previous_step: String,
    ref: String,

});

const User = mongoose.model('User', userScheme);

module.exports = User;
