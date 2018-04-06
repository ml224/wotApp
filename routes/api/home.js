'use strict';

let router = require('express').Router({
        mergeParams: true
    }),
    jsonModel = require('./../../resources/model'),
    model = jsonModel.model,
    resources = jsonModel.resources,
    utils = require('./../../utils/utils');

router.route('/')
    .get(function (req, res) {
        res.status(200);
        //adding Links header
        let type = utils.formatUrl(req);
        res.links({
            model: '/model/',
            resources: '/pi/resources/',
            type: type
        });

        let result = JSON.stringify({
            name: "WoT Sensor Bank",
            description: "raspberry pi connected to sensors",
            _links: {
                self: type,
                next: "/model/"
            }
        });
        
        res.send(result);
        return;
    });

router.route('/model')
    .get(function (req, res) {
        res.status(200);
        res.send(model.model);
        return;
    });

router.route('/properties')
    .get(function (req, res) {
        res.status(200);
        res.send(model.model.properties);
        return;
    });

router.route('/pi')
    .get(function (req, res) {
        res.status(200);
        res.send(resources.pi);
        return;
    });

module.exports = router;