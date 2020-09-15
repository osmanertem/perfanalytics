function PerfAnalytics(_siteId) {

  let siteId = _siteId;

  function main() {
    window.addEventListener("load", onWindowLoadedHandler)
  }

  function onWindowLoadedHandler() {
    const performance = window.performance || window.webkitPerformance || window.mozPerformance || window.msPerformance;
    if (typeof performance === "undefined") {
      return;
    }
    const performanceMetrics = gatherPerformanceMetrics(performance);
    reportPerformanceMetrics(performanceMetrics);
  }

  function gatherPerformanceMetrics(performance) {
    const FCP = getFCP(performance);
    const TTFB = getTTFB(performance);
    const domLoad = getDomLoad(performance);
    const windowLoad = getWindowLoad(performance);
    const resourceLoadTimes = getResourceLoadTimes(performance);
    return { FCP, TTFB, domLoad, windowLoad, resourceLoadTimes };
  }

  function reportPerformanceMetrics(performanceMetrics) {
    window.analyticData = {
      ...performanceMetrics,
      siteId,
      origin: window.location.origin,
      url: window.location.href,
    };

    fetch('https://osmanertem-perf-analytics.herokuapp.com/addAnalyticsResult', {
      method: 'POST',
      body: JSON.stringify({ reportData: window.analyticData }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log("Could not send analytics to server", error);
      });
  }

  function getTTFB(performance) {
    return performance.timing.responseStart - performance.timing.requestStart;
  }

  function getFCP(performance) {
    const paintPerformanceEntries = performance.getEntriesByType("paint");
    const fcpEntry = paintPerformanceEntries.find(element => element.name === "first-contentful-paint");
    return fcpEntry.startTime;
  }

  function getWindowLoad(performance) {
    return Date.now() - performance.timing.navigationStart;
  }

  function getDomLoad(performance) {
    return performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
  }

  function getResourceLoadTimes(performance) {
    return performance.getEntriesByType("resource").map((element) => {
      return {
        name: element.name,
        duration: element.duration,
        transferSize: element.transferSize,
        initiatorType: element.initiatorType,
      };
    });
  }

  main();
}
// perfAnalyticSiteId variable must be defined by the user
let perf = new PerfAnalytics(perfAnalyticSiteId);
