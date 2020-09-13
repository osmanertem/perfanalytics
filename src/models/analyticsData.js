const mongoose = require('mongoose');
const ResourceLoadTime = require('./resourceLoadTime');

const AnalyticsDataSchema = new mongoose.Schema({
  FCP: Number,
  TTFB: Number,
  domLoad: Number,
  windowLoad: Number,
  resourceLoadTimes: [ResourceLoadTime.ResourceLoadTimeSchema],
  reporterIp: String,
  url: String,
}, { timestamps: { createdAt: 'createdAt' } });

module.exports = {
  AnalyticsDataSchema,
}