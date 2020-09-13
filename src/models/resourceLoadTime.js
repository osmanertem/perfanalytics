const mongoose = require('mongoose');

const ResourceLoadTimeSchema = new mongoose.Schema({
  name: String,
  duration: Number,
  transferSize: Number,
  initiatorType: String,
});

module.exports = {
  ResourceLoadTimeSchema,
}