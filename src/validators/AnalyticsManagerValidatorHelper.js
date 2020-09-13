const Joi = require('joi');

function isValid_CreateSite_Params(siteUrl) {
    const schema = Joi.object().keys({
        siteUrl: Joi.string().uri().required(),
    });

    const { error } = schema.validate({
        siteUrl,
    });

    return error ? false : true;
}

function isValid_AddAnalyticsResult_Params(reportData) {
    const schema = Joi.object().keys({
        FCP: Joi.number().required(),
        TTFB: Joi.number().required(),
        siteId: Joi.string().required(),
        domLoad: Joi.number().required(),
        windowLoad: Joi.number().required(),
        resourceLoadTimes: Joi.array().min(1),
        origin: Joi.string().uri().required(),
        url: Joi.string().uri().required(),
    });

    const { error } = schema.validate({
        FCP: reportData.FCP,
        TTFB: reportData.TTFB,
        siteId: reportData.siteId,
        origin: reportData.origin,
        domLoad: reportData.domLoad,
        windowLoad: reportData.windowLoad,
        resourceLoadTimes: reportData.resourceLoadTimes,
        url: reportData.url,
    });
    return error ? false : true;
}

function isValid_GetAnalyticsData_Params(siteId, startTime, endTime) {
    const schema = Joi.object().keys({
        siteId: Joi.string().required(),
        startTime: Joi.date(),
        endTime: Joi.date().greater(Joi.ref('startTime')),
    });

    const { error } = schema.validate({
        siteId,
        endTime,
        startTime
    });

    return error ? false : true;
}

module.exports = {
    isValid_CreateSite_Params,
    isValid_GetAnalyticsData_Params,
    isValid_AddAnalyticsResult_Params,
};