// Fire off AJAX request to log page load
/*
 * window.addEventListener('load', function(e){
    console.log('LOADED');
    logEvent(e, function(e){return {}});
});
*/

// Facility to wrap input events in logging
function wrapEvent(eType, extractor){
    document.addEventListener(eType, function(e){
        logEvent(e, extractor);
    });
}

// Wrap all click events
wrapEvent('click', getMouseData);

// Wrap all keydown events - bucket all alphanumeric key presses into one for privacy
wrapEvent('keydown', getKeyData);

// Wrap all scroll events
wrapEvent('scroll', getMouseData);

/************************************************************/

// Logs Input Event
function logEvent(e, getData){
    data = {
        eventType: e.type,
        eventData: getData(e)
    }
    logData(data);
}

// Map all alphanumeric keys onto -1 so we don't see everything you type
function getKeyType(e){
    var code = e.keyCode;
    console.log(e.keyCode);
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
    sendAJAX("POST", data);
}

// Returns current site url
function getUrl(){
    return document.URL;
}

// Sends message to background to fire AJAX logging request
function sendAJAX(type, data){
    chrome.runtime.sendMessage({
        method: type,
        action: 'xhttp',
        data: data,
    }); // no response handler; don't care
}

// Fire off immediately
logEvent({
    type: 'load',
}, function(e){return {}});
