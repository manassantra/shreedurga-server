const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true},
  email: { type: String },
  originLocation: { type: String, required: true},
  destinationLocation: { type: String, required: true},
  totalDistance: { type: Number, required: true},
  totalPrice: { type: Number, default: 0.00},
  carDetails: { type: Object, default: {} },
  date: { type: Date },
  bookingStatus: { type: String }
});


module.exports = mongoose.model('bookings', bookingSchema);