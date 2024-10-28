const mongoose = require('mongoose');

const locationConfigSchema = mongoose.Schema({
  _id: {type: String, required: true},
  locationName: {type: String, required: true},
  addressLine1: {type: String, required: true},
  addressLine2: {type: String},
  city: {type: String, required: true},
  landmark: {type: String},
  state: {type: String, required: true},
  country: {type: String, required: true},
  pinCode: {type: Number, required: true},
  long: {type: String, required: true},
  lat: {type: String, required: true},
  isActive: {type: Boolean}
});


module.exports = mongoose.model('LocationConfig', locationConfigSchema);