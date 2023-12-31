const mongoose = require('mongoose');


//Mongoose Schema...
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String, required: true},
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1}
});

module.exports = mongoose.model('Order', orderSchema);