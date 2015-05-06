Hashnest API Client for node.js

Deployment
* Pack the module (npm pack)
* Install the module in your application (npm install path-to-the-module/hashnest/hashnest-x.x.x.tgz)
* Update your_app/node_modules/hashnest/config.json with valid API key, secret and user name

Ver. 0.0.2
* Implements getMarketOrderHistory API call (/api/v1/currency_markets/order_history)

Ver. 0.0.1
* Implements getCurrencyMarkets API call (/api/v1/currency_markets)
* Implements generic API request
* Implements HMAC with SHA256
 
References:
http://www.freeformatter.com/hmac-generator.html for testing HMAC SHA256
http://rapiddg.com/blog/calling-rest-api-nodejs-script
https://www.npmjs.com/package/node-rest-client
http://cwbuecheler.com/web/tutorials/2014/restful-web-app-node-express-mongodb/