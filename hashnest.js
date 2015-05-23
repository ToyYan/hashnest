var https = require("https");
var crypto = require("crypto");
var config = require("./config.json");

var hashnestHost = 'www.hashnest.com';
var currencyMarketsEndpoint = '/api/v1/currency_markets';
var marketOrderHistoryEndpoint = '/api/v1/currency_markets/order_history';

/*
HTTP METHOD: POST
HTTP URL: https://www.hashnest.com/api/v1/currency_markets
Param:
  access_key: (details see the verification method）
  nonce: (details see the verification method）
  signature: (details see the verification method）

Return Result
[
  {
    id: 11,
    name: "ANTS2/BTC"
  }
]
*/
function getCurrencyMarkets(callback) {
	var nonce = Date.now();
	var params = "access_key=" + config.key + "&nonce=" + nonce + "&signature=" + getSignature(nonce);

	performRequest(hashnestHost, currencyMarketsEndpoint, params, callback);
}
/*
HTTP METHOD: POST
HTTP URL: https://www.hashnest.com/api/v1/currency_markets/order_history
Param:
  access_key: (details see the verification method）
  nonce: (details see the verification method）
  signature: (details see the verification method）
  category: (entrust type eg: [sale|purchase])
  currency_market_id: (Market ID)

Return Result:
[
  {
    ppc: "0.00001",
    amount: "4.0",
    total_price: "0.00004",
    created_at: "2014-12-09 01:06:00"
  }
]
*/
function getMarketOrderHistory(marketId, category, callback) {
	var nonce = Date.now();
	var params = 'access_key=' + config.key + '&nonce=' + nonce + '&signature=' + getSignature(nonce) + '&category=' + category + '&currency_market_id=' + marketId;

	performRequest(hashnestHost, marketOrderHistoryEndpoint, params, callback);
}

function performRequest(host, endpoint, params, success) {
	var options = {
		host: host,
		path: endpoint + '?' + params,
		method: 'POST',
		};

	var req = https.request(options, function(res) {
		res.setEncoding('utf-8');
		var responseString = '';
		
		res.on('data', function(data) {
			responseString += data;
		});
		
		res.on('end', function() {
			// reviving the data types
			success(JSON.parse(responseString, function (prop, val) {
				if((prop === 'ppc') || (prop === 'amount') || (prop === 'total_price') || (prop === 'id'))
					return Number(val);
				else if (prop === 'created_at')
					return new Date(val);
				else 
					return val;
			}));
		});
	});

	req.end();
}

function getSignature(nonce) {
	var message = nonce + config.user + config.key;
	var hmac = crypto.createHmac('sha256', config.secret);
	hmac.update(message);
	return hmac.digest("hex");
}

exports.getCurrencyMarkets = getCurrencyMarkets;
exports.getMarketOrderHistory = getMarketOrderHistory;