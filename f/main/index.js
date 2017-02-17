var http = require('http');
var ERROR_JSON = '{ "error": true, "code": 500 }';

module.exports = function(params, callback) {
    var url = params.kwargs.url;
    return fetchMetadata(url, callback);
};

function fetchMetadata(url, callback) {
    var remoteEndpoint = 'http://wtfisthis.herokuapp.com/api/' + encodeURIComponent(url);

    return http.get(remoteEndpoint, handleResponse);

    function handleResponse(response) {
        var body = '';

        response.on('data', function(chunk) {
            body += String(chunk);
        });

        response.on('end', function() {
            callback(null, sanitize(body));
        });

        response.on('error', function(e) {
            callback(null, ERROR_JSON);
        });
    }

    function sanitize(body) {
        try {
            body = JSON.parse(body);
            return JSON.stringify(body);
        } catch (e) {
            return ERROR_JSON;
        }
    }
}