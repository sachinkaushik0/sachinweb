//const mongoose = require('mongoose');
import mongoose from 'mongoose'
const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  description: {
    type: String,
    trim: true,
    required: 'Description is required'
  },
  price: {
    type: String,
    trim: true,
    required: 'Price is required'
  },
  quantity: {
    type: String,
    trim: true,
    required: 'Quantity is required'
  },
  category: {
    type: String,
    trim: true,
    required: 'Category is required'
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});
//module.exports = mongoose.model('User', UserSchema);
export default mongoose.model('products', ProductsSchema);


