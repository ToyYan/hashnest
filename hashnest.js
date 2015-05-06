var https = require("https");
var crypto = require("crypto");
var config = require("./config.json");

var hashnestHost = 'www.hashnest.com';
var currencyMarketsEndpoint = '/api/v1/currency_markets';

function getCurrencyMarkets(callback) {
	var nonce = Date.now();
	var params = "access_key=" + config.key + "&nonce=" + nonce + "&signature=" + getSignature(nonce);

	performRequest(hashnestHost, currencyMarketsEndpoint, params, callback);
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
			success(JSON.parse(responseString));
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