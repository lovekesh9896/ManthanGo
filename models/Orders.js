const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
	{
		item: {
			ref: 'Item',
			type: mongoose.Schema.Types.ObjectId,
		},
		coupon: {
			type: String,
		},
		amount: {
			type: Number,
		},
		paid: {
			type: Boolean,
		},
		phone: {
			type: Number,
		},
		email: {
			type: String,
		},
		order_id: {
			type: String,
		},
		payment_id: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
