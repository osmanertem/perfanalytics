const mongoose = require('mongoose');

const WebsiteSchema = new mongoose.Schema({
  siteId: String,
  siteUrl: {
    type: String,
    index: true,
    unique: true
  },
  createdAt: { type: Date }
});

WebsiteSchema.index({ siteUrl: 1 }, { unique: true });

const WebsiteModel = mongoose.model('website', WebsiteSchema);
WebsiteModel.createIndexes();

module.exports = {
  WebsiteModel,
  WebsiteSchema,
}