# PerfAnalytics
![Node.js CI](https://github.com/osmanertem/perfanalytics/workflows/Node.js%20CI/badge.svg?branch=master)

PerfAnalytics is an ecosystem which collectes and criticizes web performance data.

Dashboard URL : https://osmanertem-perf-analytics.herokuapp.com/dashboard/#/

**Note 1:** Since Heroku sends idle apps to sleeping state, it may take couple of seconds app to get up and running.

**Note 2:** An example data set is added for demo purposes. If you set StartTime to 13.09.2020 08.00 and EndTime 15.09.2020 08.00 you can see demo data on charts and tables. 

## Table of contents
<!--ts-->
   * [Project setup](#project-setup)
   * [How to run](#how-to-run)
   * [How to use](#how-to-use)
   * [Design](#design)
      * [FE implementaion (Dashboard)](#fe-implementation)
      * [BE implementation](#be-implementation)
          * [Notes about classes](#notes-about-classes)
      * [PerfAnalytics.JS](#perfanalyticsjs)
      * [CI / CD](#ci--cd)
      * [Possible Improvements in Future](#possible-improvements-in-future)
  * [Screenshots](#screenshots)
<!--te-->

## Project setup

Crete .env file at root and fill following variables.
```
DB_USER_NAME=''
DB_PASSWORD=''
DB_SERVER=''
DB_NAME=''
```

```
npm install
```

## How to run
```
npm run start;

# linter
npm run lint;

# unit tests
npm run test # all, be and fe tests
npm run test:be;
npm run test:fe; # vue.js dev mode

# test coverage reports
npm run coverage:be;
npm run coverage:fe;

# development mode FE and BE projects separately
npm run start:dev:be; 
npm run start:dev:fe;
```

## How to use

* First you need to register your site on PerfAnalytics Dashboard by clicking "Add new Site" button.
* Copy the newly created site's id.
* Set the siteId to perfAnalyticSiteId variable below

```html
<script>
  const perfAnalyticSiteId = "uuid";
</script>
<script async src="https://osmanertem-perf-analytics.herokuapp.com/perfAnalytics.js"></script>
```

## Design
### FE implementaion (Dashboard)
* Implementation on FE side is done with **Vue** and **Vuex**.
* Each component is designed to be reusable. They are not tightly coupled. Communication between components are done with events & props.
* sdk.js is designed to manage the communication with BE. If communication protocol changes in feature (like moving to webSocket) only sdk.js will be effected. The rest of the implementation will remain same.
* Promises are widely used to handle async operations. 
* Unit tests are implemented for some of components.

Component Structure of PerfAnalytics Dashboard
![Component Structure of PerfAnalytics Dashboard](assets/ui-component-structure.png?raw=true "Component Structure of PerfAnalytics Dashboard")

### BE implementation
* MongoDB atlas service is used
* BE architecture is designed to be able to support future requests.
* BE Software is split into different layers and these layers loosely coupled.
* BE serves for both Dashboard and PerfAnalytics.JS
* Promises and async programming best practices are carefully used on entire project.
* Analytics calculation duration is printed on console everytime and it takes about **300ms** on average

Sequence Diagram for a analytics report request
![Sequence Diagram for a analytics report request](assets/sequence-diagram-for-analytics.report.png?raw=true "Sequence Diagram for a analytics report request")

#### Notes about classes
* `Server.js`
  * This class is responsible for receiving HTTP requests and answering them with the data provided from Bussiness Logic classes (currently AnalyticsManager)
  * All Server related implementations are done only in this class.
* `AnalyticsManager.js`
  * This class is designed to implement any bussiness logic that is required to perform Analytics operations.
  * This class does not inclue any DB related implementation.
  * DB related implementations are handled in `analyticsDataProvider`
* `MongooseDBConnector.js`
  * This class is responsible for managing connection with Mongoose&MongoDB
* `analyticsDataProvider.js`
  * This class is responsible for making mongoose&mongoDB query requests.
  * Only this class has mongoose specific query implementations in entire project.
  * Changing DB technology in future will only effect this class.
* `AnalyticsManagerValidatorHelper.js`
  * This helper class holds the validator configurations for objects used in the project.
  * It is implemented as a helper to let it be used by various classes in future.

### PerfAnalytics.JS
* PerfAnalytics.JS is located under /public folder
* Before including the script, **perfAnalyticSiteId** variable must be defined.
```html
<script>
  const perfAnalyticSiteId = "uuid";
</script>
```
* It should be included in host page with following code
```html
<script async src="https://osmanertem-perf-analytics.herokuapp.com/perfAnalytics.js"></script>
```
* Script tag should include "async" attribute in order not to harm page load time.
* The script registers to window.load event.
* Then it collects the data from window.performance
* It sends the collected data to PerfAnalytics api with an async fetch requests. 

### CI / CD
* Automated deployment is configured on heroku dashboard
* Github Actions is configured to work on every push
* Automated deployment is configured to wait a successful github actions workflow result.

### Possible Improvements in Future
* Dashboard tables should support sorting, searching, paging.
* Mechanisms should be developed to validate genuineness of the reported data.
* Unit tests should be improved on FE side.
* e2e test should be implemented on FE side.
* Server.js unit tests may be written.
* getAnalyticsData endpoint should support paging
* Perfanaltytics.JS may be minified. It is currently 2.448 bytes

# Screenshots
Loadtest

![Dashboard](assets/loadtest.png?raw=true "Dashboard")

Dashboard 1
![Dashboard](assets/dashboard-1.png?raw=true "Dashboard")

Dashboard 2
![Dashboard](assets/dashboard-2.png?raw=true "Dashboard")
