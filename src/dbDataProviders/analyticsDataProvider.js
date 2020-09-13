/**
 * Mongoose specific implementation is done in this class
 */
const { v4: getUUID } = require("uuid");
const Website = require("../models/Website");
const SiteAnalytics = require("../models/siteAnalytics");

function getSites() {
  return Website.WebsiteModel.find().select(["siteId", "siteUrl", "-_id"]);
}

function createSite(siteUrl) {
  const newSiteDoc = new Website.WebsiteModel({
    siteId: getUUID(),
    siteUrl: siteUrl
  });
  return newSiteDoc.save().then(createdSiteData => {

    const newSiteAnalyticsData = new SiteAnalytics.SiteAnalyticsModel({
      siteId: createdSiteData.siteId,
      analytics: []
    });
    return newSiteAnalyticsData.save().then(() => {
      return createdSiteData;
    });
  });
}

function getAnalyticsData(siteId, startTime, endTime) {
  startTime = startTime || new Date(Date.now() - 30 * 60 * 1000).getTime();
  endTime = endTime || new Date().getTime();

  // console.log("startTime", startTime, new Date(startTime));
  // console.log("endTime", endTime, new Date(endTime));

  return SiteAnalytics.SiteAnalyticsModel.aggregate([
    { $match: { siteId } },
    {
      $project: {
        siteId: 1,
        analytics: {
          $filter: {
            input: '$analytics',
            as: 'item',
            cond: {
              $and: [
                { $lte: ['$$item.createdAt', new Date(endTime)] },
                { $gte: ['$$item.createdAt', new Date(startTime)] }
              ]
            }
          }
        }
      }
    }
  ]).then(queryResult => {
    return queryResult.length > 0 ? queryResult[0].analytics : [];
  });
}

function addAnalyticsResult(reportData) {
  return SiteAnalytics.SiteAnalyticsModel
    .findOne({ siteId: reportData.siteId })
    .then(currentSiteAnalyticsDoc => {

      currentSiteAnalyticsDoc.analytics.push({
        FCP: reportData.FCP,
        TTFB: reportData.TTFB,
        domLoad: reportData.domLoad,
        windowLoad: reportData.windowLoad,
        resourceLoadTimes: reportData.resourceLoadTimes,
        reporterIp: reportData.reporterIp,
        url: reportData.url
      });

      return currentSiteAnalyticsDoc.save();
    });
}

module.exports = {
  getSites,
  createSite,
  getAnalyticsData,
  addAnalyticsResult,
};