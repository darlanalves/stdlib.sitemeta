var http = require('http');

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

        response.on('end', function(chunk) {
            if (chunk) {
                body += chunk;
            }

            console.log('sdsds', body);
            callback(null, body);
        });

        response.on('error', function(e) {
            callback(e);
        });
    }
}