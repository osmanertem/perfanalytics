const SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'https://osmanertem-perf-analytics.herokuapp.com/'
  : 'http://localhost:8080/';

function getSites() {
  return fetch(`${SERVER_URL}getSites`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

function createSite({ siteUrl }) {
  return fetch(`${SERVER_URL}createSite`, {
    method: 'POST',
    body: JSON.stringify({ siteUrl }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

function getAnalyticsData({ siteId, startTime, endTime }) {
  return fetch(`${SERVER_URL}getAnalyticsData?${new URLSearchParams({ siteId, startTime, endTime })}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('getAnalyticsData failed');
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = {
  getSites,
  createSite,
  getAnalyticsData,
};
