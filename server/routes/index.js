var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/log', function(req, res) {
  console.log('Got Data: ' + JSON.stringify(req.body));
  res.json({});
});

module.exports = router;
