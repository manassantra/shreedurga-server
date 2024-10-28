const mongoose = require('mongoose');

const adminUserSchema = mongoose.Schema({
  _id: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  mobile: {type: Number, length: 10, required: true},
  isActive: {type: Boolean}
});


module.exports = mongoose.model('Admin', adminUserSchema);