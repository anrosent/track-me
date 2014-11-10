var express = require('express');
var logger  = require('dataLogger.js');
var router = express.Router();

/* GET home page. */
router.post('/log', function(req, res) {
  logger.write(JSON.stringify(req.body) + '\n');
  res.json({});
});

module.exports = router;
