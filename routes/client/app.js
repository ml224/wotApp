'use strict';

let router = require('express').Router();
let resources  = require('./../../resources/model').resources;

router.route('/')
.get(function(req, res){
    res.status(200);
    res.render('home', {sensors: resources.pi.resources});
});

module.exports = router;