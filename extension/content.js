// All the urls to report your events to
// feel free to add your own logging endpoint!
var LOGGER_URLS = ['http://anson.codes:8000/log'];

// Facility to wrap input events in logging
function wrapEvent(eType, extractor){
    document.addEventListener(eType, function(e){
        logEvent(e, extractor);
    });
}

// Wrap all click events
wrapEvent('click', getMouseData);

// Wrap all keypress events - bucket all alphanumeric key presses into one for privacy
wrapEvent('keypress', getKeyData);

// Wrap all scroll events
wrapEvent('scroll', getMouseData);

/************************************************************/

// Logs Input Event
function logEvent(e, getData){
    data = {
        url: getUrl(),
        time: e.timeStamp,
        eventType: e.type,
        eventData: getData(e)
    }
    logData(data);
}

// Map all alphanumeric keys onto -1 so we don't see everything you type
function getKeyType(e){
    var code = e.charCode;
    if(code >= 32 && code <= 126)
        return -1;
    else
        return code;
}

// Gets salient data from key press events
function getKeyData(e){
    return {
        key: getKeyType(e),
        wasAlt: e.altKey,
        wasShft: e.shiftKey,
        wasCtrl: e.ctrlKey,
        wasMeta: e.metaKey,
    };
}

// Gets salient data from mouse events
function getMouseData(e){
    return {
        x: e.clientX,
        y: e.clientY,
        w: window.innerWidth,
        h: window.innerHeight,
        button: e.button,
        wasAlt: e.altKey,
        wasShft: e.shiftKey,
        wasCtrl: e.ctrlKey,
        wasMeta: e.metaKey,
    };
}

// Logs all metadata associated with input event
function logData(data){
    LOGGER_URLS.forEach(function(log_url){
        sendAJAX("POST", log_url, data);
    });
}

// Returns current site url
function getUrl(){
    return document.URL;
}

// Sends message to background to fire AJAX logging request
function sendAJAX(type, url, data){
    console.log("sending to runtime");
    chrome.runtime.sendMessage({
        method: type,
        action: 'xhttp',
        url: url,
        data: data,
    }); // no response handler; don't care
}
