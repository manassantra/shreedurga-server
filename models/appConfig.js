const mongoose = require('mongoose');

const appConfigSchema = mongoose.Schema({
  _id: {type: String, required: true},
  environment: {type: String, required: true},
  appName: {type: String, required: true},
  version: {type: String},
  address: {type: String},
  contact: {type: Number, required: true},
  email: {type: String, required: true},
  isActive: {type: Boolean}
});


module.exports = mongoose.model('AppConfig', appConfigSchema);