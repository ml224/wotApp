'use strict';

let router = require('express').Router();
let model = require('./../../resources/model');
let sensors = model.resources.pi.resources;
let utils = require('./../../utils/utils');

router.route('/')
.get(function(req, res){
    let links = utils.getLinks(sensors);
    links.push('/model', '/pi', 'pi/resources', '/properties', '/');

    links.sort(function(a, b){
        return a.length - b.length;
    })

    res.status(200);
    res.render('api', {links: links});
});

module.exports = router;