var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET insert page. */
router.get('/insert', function(req, res, next) {
  res.render('insert', { title: 'Express' });
});

/* GET list page. */
router.get('/elenco', function(req, res, next) {
  res.render('elenco', { title: 'Express' });
});


module.exports = router;
