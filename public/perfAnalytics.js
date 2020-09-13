function PerfAnalytics(_siteId) {

  let siteId = _siteId;

  function main() {
    window.addEventListener("load", onWindowLoadedHandler)
    console.log("initializin perf analytics");
    // TODO: remove
    // setTimeout(onWindowLoadedHandler, 1000);
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

    console.log("FCP", FCP);
    console.log("TTFB", TTFB);
    console.log("domLoad", domLoad);
    console.log("windowLoad", windowLoad);
    console.log("resourceLoadTimes", resourceLoadTimes);

    return { FCP, TTFB, domLoad, windowLoad, resourceLoadTimes };
  }

  function reportPerformanceMetrics(performanceMetrics) {
    // TODO: post results to the server
    window.analyticData = {
      ...performanceMetrics,
      siteId,
      origin: window.location.origin,
      url: window.location.href,
    };
    console.log(JSON.stringify(window.analyticData));
    console.log("7");
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

function initPerfAnalytics(siteId) {
  let perf = new PerfAnalytics(siteId);
}

initPerfAnalytics("2a6f0fa8-a05d-4751-b622-64a38983b473");