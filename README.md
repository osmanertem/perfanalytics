# PerfAnalytics

PerfAnalytics is an ecosystem which collectes and criticizes web performance data.

Dashboard URL : https://osmanertem-perf-analytics.herokuapp.com/dashboard/#/

## Project setup
```
npm run install
```

## How to run
```
npm run start;

# linter
npm run lint;

# unit tests
npm run test:be;
npm run test:fe;

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
<script async src="https://osmanertem-perf-analytics.herokuapp.com/perfAnalytics.js"></script>
<script>
    const perfAnalyticSiteId = "uuid"; 
    initPerfAnalytics(perfAnalyticSiteId);
</script>
```

# Design
## FE implementaion
* Implementation on FE side is done with **Vue** and **Vuex**.
* Each component is designed to be reusable. They are not tightly coupled. Communication between components are done with events & props.
* sdk.js is designed to manage the communication with BE. If communication protocol changes in feature (like moving to webSocket) only sdk.js will be effected. The rest of the implementation will remain same.
* Promises are widely used to handle async operations. 
* Unit tests are implemented for some of components.

Component Structure of PerfAnalytics Dashboard
![Component Structure of PerfAnalytics Dashboard](assets/ui-component-structure.png?raw=true "Component Structure of PerfAnalytics Dashboard")

## BE implementation
* MongoDB atlas service is used
* BE architecture is designed to be able to support future requests.
* BE Software is split into different layers and these layers loosely coupled.
* BE serves for both Dashboard and PerfAnalytics.JS
* Promises and async programming best practices are carefully used on entire project.
* Analytics calculation duration is printed on console everytime and it takes about **300ms** on average

Sequence Diagram for a analytics report request
![Sequence Diagram for a analytics report request](assets/sequence-diagram-for-analytics.report.png?raw=true "Sequence Diagram for a analytics report request")

### Notes about classes
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

## Possible Improvements in Future
* Dashboard tables should support sorting, searching, paging.
* Mechanisms should be developed to validate genuineness of the reported data.
* Unit tests should be improved on FE side.
* e2e test should be implemented on FE side.
* Server.js unit tests may be written.
* getAnalyticsData endpoint should support paging

## Screenshots
Loadtest
![Dashboard](assets/loadtest.png?raw=true "Dashboard")

Dashboard 1
![Dashboard](assets/dashboard-1.png?raw=true "Dashboard")

Dashboard 2
![Dashboard](assets/dashboard-2.png?raw=true "Dashboard")