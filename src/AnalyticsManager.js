const ERRORS = require("./ERRORS.json");
const validators = require("./validators/AnalyticsManagerValidatorHelper");
const analyticsDataProvider = require("./dbDataProviders/analyticsDataProvider");

module.exports = function () {

  function main() { }

  this.getSites = function () {
    return analyticsDataProvider.getSites().catch((err) => {
      return Promise.reject({ ...ERRORS.DB_QUERY_FAILED, mongoErrName: err.name, mongoErrCode: err.code });
    });
  };

  this.createSite = function (siteUrl) {
    if (!validators.isValid_CreateSite_Params(siteUrl)) {
      return Promise.reject(ERRORS.INVALID_REQUEST_PARAMETERS)
    }
    return analyticsDataProvider.createSite(siteUrl).catch((err) => { 
      return Promise.reject({ ...ERRORS.DB_QUERY_FAILED, mongoErrName: err.name, mongoErrCode: err.code });
    });
  };

  this.addAnalyticsResult = function (reportData, reporterIp) {
    const reportDataObj = { reportData, reporterIp };
    if (!validators.isValid_AddAnalyticsResult_Params(reportDataObj)) {
      return Promise.reject(ERRORS.INVALID_REQUEST_PARAMETERS)
    }
    return analyticsDataProvider.addAnalyticsResult(reportDataObj).catch((err) => {
      return Promise.reject({ ...ERRORS.DB_QUERY_FAILED, mongoErrName: err.name, mongoErrCode: err.code });
    });
  };

  this.getAnalyticsData = function (siteId, startTime, endTime) {
    if (!validators.isValid_GetAnalyticsData_Params(siteId, startTime, endTime)) {
      return Promise.reject(ERRORS.INVALID_REQUEST_PARAMETERS)
    }
    return analyticsDataProvider.getAnalyticsData(siteId, startTime, endTime).catch((err) => {
      return Promise.reject({ ...ERRORS.DB_QUERY_FAILED, mongoErrName: err.name, mongoErrCode: err.code });
    });
  };

  main();
};