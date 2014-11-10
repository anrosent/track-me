var fs = require('fs');

var dataLogger = fs.createWriteStream(__dirname + '/logs/events.log', {
    flags: 'a'
});

module.exports.write = function(data){
    dataLogger.write(data);
}
