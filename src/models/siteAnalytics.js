const mongoose = require('mongoose');
const AnalyticsData = require('./analyticsData');

const SiteAnalyticsSchema = new mongoose.Schema({
  siteId: {
    type: String,
    index: true,
    unique: true
  },
  analytics: [AnalyticsData.AnalyticsDataSchema]
});

SiteAnalyticsSchema.index({ siteId: 1 }, { unique: true });
const SiteAnalyticsModel = mongoose.model('siteAnalytics', SiteAnalyticsSchema);
SiteAnalyticsModel.createIndexes();

module.exports = {
  SiteAnalyticsModel,
  SiteAnalyticsSchema,
}