const ERRORS = require("./ERRORS.json");
const validators = require("./validators/AnalyticsManagerValidatorHelper");
const analyticsDataProvider = require("./dbDataProviders/analyticsDataProvider");

module.exports = function () {

    function main() { }

    this.getSites = function () {
        return analyticsDataProvider.getSites().catch(() => {
            return Promise.reject(ERRORS.DB_QUERY_FAILED);
        });
    };

    this.createSite = function (siteUrl) {
        if (!validators.isValid_CreateSite_Params(siteUrl)) {
            return Promise.reject(ERRORS.INVALID_REQUEST_PARAMETERS)
        }
        return analyticsDataProvider.createSite(siteUrl).catch(() => {
            return Promise.reject(ERRORS.DB_QUERY_FAILED);
        });
    };

    this.addAnalyticsResult = function (reportData) {
        if (!validators.isValid_AddAnalyticsResult_Params(reportData)) {
            return Promise.reject(ERRORS.INVALID_REQUEST_PARAMETERS)
        }
        return analyticsDataProvider.addAnalyticsResult(reportData).catch(() => {
            return Promise.reject(ERRORS.DB_QUERY_FAILED);
        });
    };

    this.getAnalyticsData = function (siteId, startTime, endTime) {
        if (!validators.isValid_GetAnalyticsData_Params(siteId, startTime, endTime)) {
            return Promise.reject(ERRORS.INVALID_REQUEST_PARAMETERS)
        }
        return analyticsDataProvider.getAnalyticsData(siteId, startTime, endTime).catch(() => {
            return Promise.reject(ERRORS.DB_QUERY_FAILED);
        });
    };

    main();
};