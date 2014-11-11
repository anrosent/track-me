// Generate session token - all your input events will be tagged with this
var MY_TOKEN = generateToken(2);


/**
 * Possible parameters for request:
 *  action: "xhttp" for a cross-origin HTTP request
 *  method: Default "GET"
 *  url   : required, but not validated
 *  data  : data to send in a POST request
 *
 * The callback function is called upon completion of the request */
chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    console.log('sending AJAX');
    if (request.action == "xhttp") {
        // Add your token to reported data
        request.data.token = MY_TOKEN;

        var xhttp = new XMLHttpRequest();
        var method = request.method ? request.method.toUpperCase() : 'GET';

        xhttp.onload = function() {
            callback(xhttp.responseText);
        };
        xhttp.onerror = function() {
            // Do whatever you want on error. Don't forget to invoke the
            // callback to clean up the communication port.
            callback();
        };
        xhttp.open(method, request.url, true);
        if (method == 'POST') {
            xhttp.setRequestHeader('Content-Type', 'application/json');
        }
        xhttp.send(JSON.stringify(request.data));
        return true; // prevents the callback from being called too early on return
    }
});

function generateToken(n){
    var token = "";
    for (var i = 0; i < n; i++){
        token += Math.random().toString(36).replace(/[^a-z]+/g, '');
    }
    return token;
}
