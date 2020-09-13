const MongooseDBConnector = require("../src/MongooseDBConnector");
const AnalyticsManager = require("../src/AnalyticsManager");
const ERRORS = require("../src/ERRORS.json");
const { v4: getUUID } = require("uuid");
const dotenv = require("dotenv");

let mongooseDBConnector;
let analyticsManager;

const exampleAnalyticsData = {
  FCP: 443.4499999988475,
  TTFB: 201,
  domLoad: 714,
  windowLoad: 779,
  resourceLoadTimes: [
    {
      _id: '5f5ced24c8dd6b2d0dce4c31',
      name: 'https://cdn.dsmcdn.com/frontend/web/production/home-97a743cd0e.async.bundle.css',
      duration: 58.20499999754247,
      transferSize: 0,
      initiatorType: 'link',
    },
  ],
  url: 'https://www.trendyol.com/butik/liste/kadin',
  origin: "https://www.trendyol.com/"
};

beforeAll((done) => {
  dotenv.config();
  mongooseDBConnector = new MongooseDBConnector();
  return mongooseDBConnector.connectToDB().then(() => {
    analyticsManager = new AnalyticsManager();
    done();
    return analyticsManager;
  });
});

afterAll(() => {
  return mongooseDBConnector.disconnect();
});

describe("Analytics Manager", () => {
  const validTestSiteUrl = "https://testsite.com/" + getUUID();
  const invalidTestSiteUrl = "https://     X/" + getUUID();
  let newTestSiteId;

  test("analyticsManager::getSites -> can get sites data", () => {
    return analyticsManager.getSites().then(sites => {
      expect(sites.length).toBeGreaterThan(0);
    });
  });
  
  test("analyticsManager::createSite -> can create site", () => {
    return analyticsManager.createSite(validTestSiteUrl).then(createdSiteData => {
      newTestSiteId = createdSiteData.siteId;
      expect(createdSiteData.siteUrl).toEqual(validTestSiteUrl);
    });
  });

  test("analyticsManager::createSite -> can not create site with invalid url", () => {
    return analyticsManager.createSite(invalidTestSiteUrl).then(() => {
      throw new Error("This promise needs to throw exception");
    }).catch(error => {
      return expect(error.httpStatusCode).toEqual(ERRORS.INVALID_REQUEST_PARAMETERS.httpStatusCode);
    });
  });

  test("analyticsManager::getAnalyticsData -> can get trendyol analytics data", () => {
    return analyticsManager.getAnalyticsData(
      "2a6f0fa8-a05d-4751-b622-64a38983b473",
      "2020-09-07T08:31:45.629Z",
      "2020-09-13T14:31:45.629Z"
    ).then(analyticsDataResults => {
      return expect(analyticsDataResults.length).toBeGreaterThan(1);
    });
  });

  test("analyticsManager::getAnalyticsData -> can detect invalid parameters (startDate cannot be greater than end date)", () => {
    return analyticsManager.getAnalyticsData(
      "2a6f0fa8-a05d-4751-b622-64a38983b473",
      "2020-09-13T14:31:45.629Z",
      "2020-09-07T08:31:45.629Z"
    ).then(() => {
      throw new Error("This promise needs to throw exception");
    }).catch(error => {
      return expect(error.httpStatusCode).toEqual(ERRORS.INVALID_REQUEST_PARAMETERS.httpStatusCode);
    });
  });

  test("analyticsManager::addAnalyticsResult -> can add new analytics result", () => {
    exampleAnalyticsData.siteId = newTestSiteId;
    return analyticsManager.addAnalyticsResult(exampleAnalyticsData, "test.computer.com").then(result => {
      expect(result._id).not.toEqual(undefined);
    });
  });

  test("analyticsManager::addAnalyticsResult -> can detect invalid parameters", () => {
    exampleAnalyticsData.siteId = newTestSiteId;
    return analyticsManager.addAnalyticsResult("{}", "test.computer.com").then(() => {
      throw new Error("This promise needs to throw exception");
    }).catch(error => {
      return expect(error.httpStatusCode).toEqual(ERRORS.INVALID_REQUEST_PARAMETERS.httpStatusCode);
    });
  });
});