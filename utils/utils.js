'use strict';

let url = require('url');
let mqtt = require('mqtt');
let client, interval;
let model = require('./../resources/model');
let thngs = model.thngs;
let sensors = model.resources.pi.resources;


exports.formatUrl = function (req) {
    return url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.originalUrl
    });
}

exports.returnRandom = function (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

exports.getLinks = function (json) {
    let arr = [];
    for (let resource in json) {
        let r = json[resource];
        arr.push(r._links.self);
    }
    return arr;
}
exports.connectMqtt = function (socket) {
    client = mqtt.connect('mqtts://mqtt.evrythng.com:8883', {
        username: 'authorization',
        password: process.env.EVRYTHNG_API_KEY
    });
    for (let thng in thngs) {
        let thngId = thngs[thng].id;
        client.on('connect', function () {
            client.subscribe('/thngs/' + thngId + '/properties/');
        });
    }

    client.on('message', function (topic, message) {
        let msg = JSON.parse(message.toString());
        let value = msg[0].value;

        switch (topic.split('/')[2]) {
            case thngs.temperature.id:
                sensors.temperature.value = value;
                socket.emit('new value', {
                    'temperature': sensors.temperature.value
                });
                break;
            case thngs.humidity.id:
                sensors.humidity.value = value;
                socket.emit('new value', {
                    'humidity': sensors.humidity.value
                });
                break;
            case thngs.pressure.id:
                sensors.pressure.value = value;
                socket.emit('new value', {
                    'pressure': sensors.pressure.value
                });
                break;
            case thngs.lux.id:
                sensors.lux.value = value;
                socket.emit('new value', {
                    'lux': sensors.lux.value
                });
                break;
        }
    });
}