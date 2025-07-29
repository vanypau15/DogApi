const mongoose = require('mongoose');
const dogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['available', 'adopted'], default: 'available' },
  registeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  adoptedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  adoptionMessage: { type: String },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Dog', dogSchema);