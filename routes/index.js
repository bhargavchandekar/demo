var express = require('express');
var router = express.Router();

var master = require('../controllers/masterController');

/* Add user */
router.post('/AddUser', master.AddUser);


module.exports = router;
