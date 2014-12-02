// Generate session token - all your input events will be tagged with this
var MY_TOKEN = generateToken(2);

var LOGGER_URLS = ['http://localhost:8000/log']

/**
 * Possible parameters for request:
 *  action: "xhttp" for a cross-origin HTTP request
 *  method: Default "GET"
 *  url   : required, but not validated
 *  data  : data to send in a POST request
 *
 * The callback function is called upon completion of the request */
chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    if (request.action == 'xhttp')
        sendAJAX(request.method.toUpperCase(), request.data, callback);
});


/*
 *  Set to fire AJAX request once Tab focus changes
 *
 */
chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.getSelected(null, function(tab){
        sendAJAX('POST', {
            eventType: 'tabSwitch',
            url: tab.url,
            time: Date.now(),
            eventData: {}
        }, function(){}); 
    });
});

function generateToken(n){
    var token = "";
    for (var i = 0; i < n; i++){
        token += Math.random().toString(36).replace(/[^a-z]+/g, '');
    }
    return token;
}

/*
 * Send AJAX request from background
 */
function sendAJAX(method, data, callback) {
    // Add your token to reported data
    data.token = MY_TOKEN;

    // v2 started at addition of page load and tab switches
    data.version = 2;

    var xhttp = new XMLHttpRequest();
    var method = method ? method : 'GET';

    xhttp.onload = function() {
        callback(xhttp.responseText);
    };
    xhttp.onerror = function() {
        // Do whatever you want on error. Don't forget to invoke the
        // callback to clean up the communication port.
        callback();
    };
    LOGGER_URLS.forEach(function(url){
        xhttp.open(method, url, true);
        if (method == 'POST') {
            xhttp.setRequestHeader('Content-Type', 'application/json');
        }
        xhttp.send(JSON.stringify(data));
    });
    return true; // prevents the callback from being called too early on return
}
