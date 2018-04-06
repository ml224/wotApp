'use strict';

let router = require('express').Router();
let resources = require('./../../resources/model').resources.pi.resources;
let utils = require('./../../utils/utils');

router.route('/')
    .get(function (req, res, next) {
        res.status(200);
        res.send(resources);
        return;
    });

router.route('/temperature')
    .get(function (req, res, next) {
        res.status(200);
        res.send(resources.temperature);
        return;
    });

    router.route('/pressure')
    .get(function (req, res, next) {
        res.status(200);
        res.send(resources.pressure);
        return;
    });

router.route('/humidity')
    .get(function (req, res, next) {
        res.status(200);
        res.send(resources.humidity);
        return;
    });

router.route('/lux')
    .get(function (req, res, next) {
        res.status(200);
        res.send(resources.lux);
        return;
    });

module.exports = router;